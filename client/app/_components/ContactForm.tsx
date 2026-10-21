"use client";

import { Button } from "@radix-ui/themes";
import { FormEvent, useState } from "react";

interface ContactFormProps {
  email: string;
  profileSlug: string;
}

interface SubmitFeedback {
  type: "success" | "error";
  message: string;
}

function ContactForm({ email, profileSlug }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<SubmitFeedback | null>(null);

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
        throw new Error(result.error || "Unable to send the message");
      }

      setFeedback({
        type: "success",
        message: result.message || "Message sent successfully",
      });

      form.reset();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to send the message";

      setFeedback({
        type: "error",
        message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-4xl py-20">
      <div className="rounded-2xl border border-base-300 bg-base-100 p-8 shadow-lg">
        <h2 className="text-4xl font-bold">Contact Me</h2>

        <p className="mt-3 text-base-content/70">
          Have a project in mind or interested in working together? Feel free to
          send me a message. Or you can reach me directly at {email}.
        </p>

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

          <div className="flex items-center justify-between">
            <p className="text-sm text-base-content/60">
              I&apos;ll reply as soon as possible.
            </p>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
