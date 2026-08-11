import type { ValidateContactFormData } from "../../../app/api/contacts/validationSchema";
const contactService = {
  async sendEmail(data: ValidateContactFormData) {
    console.log("Sending email with data:", data);

    // Email sending logic

    return { success: true, message: "Email sent successfully" };
  },
};

export default contactService;
