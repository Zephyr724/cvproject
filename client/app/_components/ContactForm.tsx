import { Button } from "@radix-ui/themes";
interface ContactFormProps {
  email: string;
}
function ContactForm({ email }: ContactFormProps) {
  return (
    <section className="mx-auto max-w-4xl py-20">
      <div className="rounded-2xl border border-base-300 bg-base-100 p-8 shadow-lg">
        <h2 className="text-4xl font-bold">Contact Me</h2>

        <p className="mt-3 text-base-content/70">
          Have a project in mind or interested in working together? Feel free to
          send me a message. Or you can reach me directly at {email}.
        </p>

        <form className="mt-10 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Message</label>

            <textarea
              rows={6}
              placeholder="Message"
              className="textarea textarea-bordered w-full"
            />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-base-content/60">
              I'll reply as soon as possible.
            </p>

            <Button type="submit">Send Message</Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
