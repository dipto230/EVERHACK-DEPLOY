import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});



const sendMail = async (to, otp) => {
    await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: to,
        subject: "🔐 Reset Your Password",
        html: `
            <div style="
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f4f6f8;
                padding: 30px;
                text-align: center;
            ">
                <div style="
                    max-width: 500px;
                    margin: 0 auto;
                    background: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                    padding: 30px 40px;
                ">
                    <h2 style="
                        color: #333;
                        margin-bottom: 10px;
                    ">
                        Reset Your Password
                    </h2>
                    <p style="
                        color: #555;
                        font-size: 15px;
                        margin-bottom: 25px;
                    ">
                        We received a request to reset your password. 
                        Use the following one-time password (OTP) to proceed:
                    </p>
                    <div style="
                        display: inline-block;
                        background: #007bff;
                        color: #fff;
                        font-size: 24px;
                        letter-spacing: 4px;
                        padding: 12px 24px;
                        border-radius: 8px;
                        margin-bottom: 20px;
                    ">
                        ${otp}
                    </div>
                    <p style="
                        color: #777;
                        font-size: 14px;
                        margin-top: 10px;
                    ">
                        This OTP will expire in <b>5 minutes</b>.
                    </p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">
                    <p style="
                        color: #999;
                        font-size: 12px;
                    ">
                        If you didn’t request this, please ignore this email.
                    </p>
                </div>
            </div>
        `
    });
};

export default sendMail;
