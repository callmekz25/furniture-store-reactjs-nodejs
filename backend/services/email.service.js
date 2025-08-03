import nodemailer from "nodemailer";
import { GMAIL_APP_PASSWORD, GMAIL_USER } from "../constants.js";
class EmailService {
  static transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  static sendVerificationEmail = async (email, token) => {
    const url = `http://localhost:8000/v1/verify?token=${token}`;
    await this.transporter.sendMail({
      from: `"Baya" <${GMAIL_USER}>`,
      to: email,
      subject: "Xác thực email",
      html: `
        <h2>Xác thực email của bạn</h2>
        <p>Nhấn nút bên dưới để xác nhận tài khoản:</p>
        <a href="${url}" 
           style="display:inline-block;padding:10px 20px;background:#4f46e5;color:white;text-decoration:none;border-radius:5px;">
          Xác nhận
        </a>
        <p>Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
      `,
    });
  };
}

export default EmailService;
