import { Resend } from "resend";

interface SendContactEmailInput {
  recipientEmail: string;
  visitorName: string;
  visitorEmail: string;
  message: string;
}

export const emailService = {
  async sendContactEmail({
    recipientEmail,
    visitorName,
    visitorEmail,
    message,
  }: SendContactEmailInput) {
    // Read server-only email configuration from environment variables.
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    if (!fromEmail) {
      throw new Error("RESEND_FROM_EMAIL is not configured");
    }

    const resend = new Resend(apiKey);

    // Remove line breaks so visitor input cannot alter the email subject.
    const subjectName = visitorName.replace(/[\r\n]+/g, " ").trim();

    // Always use the shared sender identity and place the visitor in Reply-To.
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      replyTo: visitorEmail,
      subject: `Portfolio contact from ${subjectName}`,
      text: [
        `Name: ${visitorName}`,
        `Email: ${visitorEmail}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    // Resend can return an error result without throwing an exception.
    if (error) {
      throw new Error(`Failed to send contact email: ${error.message}`);
    }

    return data;
  },
};
