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

      const user = await userModel.create({
         email,
         password: hashedPassword,
         userName
      })

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

export { register }