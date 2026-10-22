"use client";

import { Button } from "@radix-ui/themes";
import { FormEvent, useEffect, useRef, useState } from "react";
import { FaRegCopy } from "react-icons/fa";

interface ContactFormProps {
  email: string;
  profileSlug: string;
}

interface SubmitFeedback {
  type: "success" | "error";
  message: string;
}

interface CopyFeedback {
  type: "success" | "error";
  message: string;
}

function ContactForm({ email, profileSlug }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<SubmitFeedback | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<CopyFeedback | null>(null);

  const feedbackRef = useRef<HTMLParagraphElement>(null);

  // Move focus to the result so keyboard and assistive-technology users
  // receive immediate confirmation after the asynchronous submission.
  useEffect(() => {
    if (feedback) {
      feedbackRef.current?.focus();
    }
  }, [feedback]);

  // Keep copy feedback temporary while cleaning up the timer on rerenders
  // and unmounts to avoid updating an inactive component.
  useEffect(() => {
    if (!copyFeedback) return;

    const timeoutId = window.setTimeout(() => {
      setCopyFeedback(null);
    }, 2000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [copyFeedback]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setFeedback(null);

    try {
      // Send only the profile identifier and visitor-provided content.
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileSlug,
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      const result: { message?: string; error?: string } =
        await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to send the message.");
      }

      setFeedback({
        type: "success",
        message: result.message || "Message sent successfully!",
      });

      form.reset();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to send the message.";

      setFeedback({
        type: "error",
        message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(email);

      setCopyFeedback({
        type: "success",
        message: "Email copied!",
      });
    } catch {
      setCopyFeedback({
        type: "error",
        message: "Unable to copy email.",
      });
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto max-w-4xl scroll-mt-16 py-12 sm:py-20"
    >
      <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-lg sm:p-8">
        <h2 id="contact-heading" className="text-3xl font-bold sm:text-4xl">
          Contact Me
        </h2>

        <p className="mt-3 text-base-content/70">
          Have a project in mind or interested in working together? Feel free to
          send me a message.
        </p>

        {email && (
          <p className="mt-2 flex flex-wrap items-center gap-2  text-base-content/70">
            Prefer email?{" "}
            <button
              type="button"
              aria-label={`Copy ${email} to clipboard`}
              className="inline-flex max-w-full min-w-0 cursor-pointer items-center gap-1 transition-opacity hover:opacity-70"
              onClick={handleCopyEmail}
            >
              <span className="break-all">{email}</span>
              <FaRegCopy className="shrink-0" aria-hidden="true" />
            </button>
            {copyFeedback && (
              <span
                role="status"
                className={
                  copyFeedback.type === "success"
                    ? "text-sm text-success"
                    : "text-sm text-error"
                }
              >
                {copyFeedback.message}
              </span>
            )}
            <a className="link" href={`mailto:${email}`}>
              Or email me directly.
            </a>
          </p>
        )}

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                className="mb-2 block text-sm font-semibold"
                htmlFor="contact-name"
              >
                Full Name
              </label>

              <input
                id="contact-name"
                name="name"
                type="text"
                required
                maxLength={100}
                disabled={isSubmitting}
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-semibold"
                htmlFor="contact-email"
              >
                Email Address
              </label>

              <input
                id="contact-email"
                name="email"
                type="email"
                required
                maxLength={254}
                disabled={isSubmitting}
                placeholder="your.email@example.com"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              htmlFor="contact-message"
            >
              Message
            </label>

            <textarea
              id="contact-message"
              name="message"
              rows={6}
              required
              maxLength={5000}
              disabled={isSubmitting}
              placeholder="Message"
              className="textarea textarea-bordered w-full"
            />
          </div>

          {feedback && (
            <p
              ref={feedbackRef}
              tabIndex={-1}
              role={feedback.type === "error" ? "alert" : "status"}
              aria-live="polite"
              className={
                feedback.type === "success"
                  ? "text-sm text-success"
                  : "text-sm text-error"
              }
            >
              {feedback.message}
            </p>
          )}

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-base-content/60">
              I&apos;ll reply as soon as possible.
            </p>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
