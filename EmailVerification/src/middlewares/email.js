import { email_Templates, welcome_email_Templates } from "../config/emailTemplate.js";
import { transporter } from "./email.config.js";



export const sendVerificationCode =async (email, verficationCode) => {
    try {
        const info = await transporter.sendMail({
            from: '"Team Vishal Soni Foundation" <vkumarsoni30@gmail.com>', // sender address
            to: email, // list of recipients
            subject: "Verify Your Email", // subject line
            text: "Verify Your Email", // plain text body
            html:email_Templates.replace("{verficationCode}", verficationCode) , // HTML body
        });
        console.log("Email sent Successfully ✅")
        console.log(info)
        
    } catch (error) {
        console.log("error", error)
    }
}


export const WelcomeEmail =async (email, userName) => {
    try {
        const info = await transporter.sendMail({
            from: '"Team Vishal Soni Foundation" <vkumarsoni30@gmail.com>', // sender address
            to: email, // list of recipients
            subject: "Verified Your Email", // subject line
            text: "Verified Your Email", // plain text body
            html:welcome_email_Templates.replace("{userName}", userName) , // HTML body
        });
        console.log("Email Verified Successfully ✅")
        console.log(info)
        
    } catch (error) {
        console.log("error", error)
    }
}