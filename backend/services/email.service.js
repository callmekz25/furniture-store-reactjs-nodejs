import nodemailer from 'nodemailer';
import { GMAIL_USER } from '../constants.js';
import { SEND_GRID_KEY } from '../constants.js';
import sgTransport from 'nodemailer-sendgrid';
class EmailService {
  static transporter = nodemailer.createTransport(
    sgTransport({
      apiKey: SEND_GRID_KEY,
    })
  );

  static sendVerificationEmail = async (email, otp) => {
    const year = new Date().getFullYear();
    const html = `
    <!doctype html>
    <html lang="vi">
      <head>
        <meta charset="utf-8">
        <meta name="x-apple-disable-message-reformatting">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Mã xác thực</title>
      </head>
      <body style="margin:0;padding:0;background:#f6f7fb;">
        <div style="display:none!important;opacity:0;color:transparent;visibility:hidden;height:0;width:0;overflow:hidden;">
          Mã OTP của bạn là ${otp}. Hết hạn sau 5 phút.
        </div>
    
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f6f7fb;">
          <tr>
            <td align="center" style="padding:32px 12px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;box-shadow:0 2px 8px rgba(0,0,0,.06);font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111827;">
                <tr>
                  <td style="padding:28px 32px 0;">
              
                    <div style="display:inline-block;padding:8px 12px;border-radius:10px;background:#111827;color:#ffffff;font-weight:700;">
                      Baya
                    </div>
    
                    <h1 style="margin:20px 0 8px;font-size:20px;line-height:1.35;">Xác thực email của bạn</h1>
                    <p style="margin:0 0 16px;font-size:14px;line-height:1.65;color:#4b5563;">
                      Nhập mã OTP bên dưới để tiếp tục. Mã sẽ hết hạn sau <strong>5 phút</strong>.
                    </p>
    
                  
                    <div style="text-align:center;margin:24px 0 8px;">
                      <div style="
                        display:inline-block;
                        padding:16px 24px;
                        border-radius:12px;
                        background:#f3f4f6;
                        border:1px solid #e5e7eb;
                        font-size:32px;
                        letter-spacing:16px;
                        font-weight:700;
                        font-family:Menlo,Consolas,Monaco,Roboto Mono,monospace;
                        color:#111827;
                        text-align:center;">
                        ${otp}
                      </div>
                    </div>
    
                    <p style="margin:0 0 4px;font-size:13px;color:#6b7280;text-align:center;">
                      Nếu bạn không yêu cầu thao tác này, vui lòng bỏ qua email.
                    </p>
    
                    <div style="border-top:1px solid #e5e7eb;margin:24px 0;"></div>
    
                    <p style="margin:8px 0 0;font-size:12px;color:#9ca3af;">
                      Email được gửi tự động, vui lòng không trả lời. © ${year} Baya
                    </p>
                  </td>
                </tr>
              </table>
    
         
              <div style="height:24px;line-height:24px;font-size:24px;">&zwnj;</div>
            </td>
          </tr>
        </table>
      </body>
    </html>
      `;
    await this.transporter.sendMail({
      from: `"Baya" <${GMAIL_USER}>`,
      to: email,
      subject: 'Xác thực email',
      html,
    });
  };
}

export default EmailService;
