import { sendVerificationCode, WelcomeEmail } from "../middlewares/email.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
   try {
      const { email, userName, password } = req.body;

      if (!email || !password) {
         return res.status(400).json({
            success: false,
            message: "All fields are required",
         })
      }

      const existedUser = await userModel.findOne({ email })
      if (existedUser) {
         return res.status(400).json({
            success: false,
            message: "User Already existed with this email",
         })
      }

      const hashedPassword = bcrypt.hashSync(password, 10)
      const verficationCode = Math.floor(100000 + Math.random() * 900000).toString()
      const user = await userModel.create({
         email,
         password: hashedPassword,
         userName,
         verficationCode
      })

      await user.save();
      sendVerificationCode(user.email, verficationCode)

      if (user) {
         return res.status(200).json({
            success: true,
            message: "User Registered Successfully",
            user
         })
      }

   } catch (error) {

      console.log("error", error)

      return res.status(400).json({
         success: false,
         message: "All fields are required",
      })
   }

}

const verifyEmail = async (req, res) => {
   try {
      const { code } = req.body;

      const user = await userModel.findOne({
         verficationCode: code,
      })

      if (!user) {
         return res.status(400).json({
            success: false,
            message: "Invalid or Expired Code"
         })
      }

      user.isVerified = true;
      user.verficationCode = undefined
      await user.save()

      await WelcomeEmail(user.email, user.userName)

      return res.status(200).json({
         success: true,
         message: "Email Verified Successfully",
      })

   } catch (error) {
      console.log("Error", error)
      return res.status(500).json({
         success: false,
         message: "Could not verify user email",
      })
   }
}
export { register, verifyEmail }