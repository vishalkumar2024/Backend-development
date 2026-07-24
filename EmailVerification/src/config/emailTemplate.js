export const email_Templates = `
    <html lang="en">
        <head>
            <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">

                    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
                        <tr>
                            <td align="center">

                                <table width="600" cellpadding="0" cellspacing="0"
                                    style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,0.08);">

                                    <!-- Header -->
                                    <tr>
                                        <td style="background:#2563eb;padding:30px;text-align:center;">
                                            <h1 style="color:#ffffff;margin:0;font-size:28px;">
                                                Email Verification
                                            </h1>
                                        </td>
                                    </tr>

                                    <!-- Body -->
                                    <tr>
                                        <td style="padding:40px;">

                                            <h2 style="margin-top:0;color:#222;">
                                                Hello,
                                            </h2>

                                            <p style="font-size:16px;color:#555;line-height:1.7;">
                                                Thank you for registering with
                                                <strong>Team Vishal Soni Foundation</strong>.
                                                Please use the verification code below to verify your email address.
                                            </p>

                                            <div style="margin:35px 0;text-align:center;">
                                                <div
                                                    style="
                                                display:inline-block;
                                                background:#f3f4f6;
                                                border:2px dashed #2563eb;
                                                padding:18px 35px;
                                                border-radius:10px;
                                                font-size:32px;
                                                font-weight:bold;
                                                letter-spacing:8px;
                                                color:#2563eb;">
                                                    {verficationCode}
                                                </div>
                                            </div>

                                            <p style="font-size:15px;color:#555;line-height:1.7;">
                                                This verification code is valid for
                                                <strong>10 minutes</strong>.
                                            </p>

                                            <p style="font-size:15px;color:#555;line-height:1.7;">
                                                If you did not request this verification,
                                                you can safely ignore this email.
                                            </p>

                                        </td>
                                    </tr>

                                    <!-- Footer -->
                                    <tr>
                                        <td style="background:#f4f6f9;padding:25px;text-align:center;">
                                            <p style="margin:0;font-size:13px;color:#777;">
                                                © ${new Date().getFullYear()} Team Vishal Soni Foundation
                                            </p>

                                            <p style="margin-top:8px;font-size:12px;color:#999;">
                                                This is an automated email. Please do not reply.
                                            </p>
                                        </td>
                                    </tr>

                                </table>

                            </td>
                        </tr>
                    </table>

                </body>
            </html>
            `



export const welcome_email_Templates =`
        <html>
            <head>
                <meta charset="UTF-8">
                    <title>Welcome</title>
            </head>

            <body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">

                <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
                    <tr>
                        <td align="center">

                            <table width="620" cellpadding="0" cellspacing="0"
                                style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 20px rgba(0,0,0,.08);">

                                <!-- Header -->
                                <tr>
                                    <td style="background:#2563eb;padding:30px;text-align:center;">
                                        <h1 style="margin:0;color:white;font-size:32px;">
                                            🎉 Welcome to Our Community!
                                        </h1>
                                    </td>
                                </tr>

                                <!-- Body -->
                                <tr>
                                    <td style="padding:40px;">

                                        <h2 style="margin-top:0;color:#222;">
                                            Hello {userName},
                                        </h2>

                                        <p style="font-size:16px;color:#555;line-height:1.8;">
                                            We're excited to have you join our community! Your registration was successful,
                                            and your account is now ready to use.
                                        </p>

                                        <p style="font-size:16px;color:#555;line-height:1.8;">
                                            Here's what you can do next:
                                        </p>

                                        <ul style="font-size:16px;color:#555;line-height:2;">
                                            <li>✅ Complete your profile.</li>
                                            <li>✅ Explore all available features.</li>
                                            <li>✅ Start using the platform immediately.</li>
                                            <li>✅ Stay tuned for future updates and improvements.</li>
                                        </ul>

                                        <div style="text-align:center;margin:40px 0;">

                                            <a href="#"
                                                style="
                                                        background:#2563eb;
                                                        color:#ffffff;
                                                        padding:14px 34px;
                                                        text-decoration:none;
                                                        border-radius:8px;
                                                        font-size:16px;
                                                        font-weight:bold;
                                                        display:inline-block;">
                                                Get Started
                                            </a>

                                        </div>

                                        <hr style="border:none;border-top:1px solid #eee;">

                                            <p style="font-size:15px;color:#666;line-height:1.8;">
                                                If you have any questions or need assistance, our support team is always ready to help.
                                            </p>

                                            <p style="font-size:15px;color:#666;">
                                                Thank you for choosing us.
                                            </p>

                                            <p style="font-size:16px;font-weight:bold;color:#222;">
                                                Team Vishal Soni Foundation
                                            </p>

                                    </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                    <td style="background:#f8f9fa;padding:25px;text-align:center;">

                                        <p style="margin:0;color:#666;font-size:14px;">
                                            © ${new Date().getFullYear()} Team Vishal Soni Foundation
                                        </p>

                                        <p style="margin-top:10px;color:#999;font-size:12px;">
                                            This email was sent automatically. Please do not reply.
                                        </p>

                                    </td>
                                </tr>

                            </table>

                        </td>
                    </tr>
                </table>

            </body>
        </html>
`