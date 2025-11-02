import express from 'express'
const app = express()

import cookieParser from 'cookie-parser'
import cors from 'cors'

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true,
}))

//Middlewares
app.use(express.json({ limit: '16kb' })) // It handles the json data comming from req.params
app.use(express.urlencoded({ extended: true }, { limit: '16kb' })) // It handles data comming from any link
app.use(cookieParser())      // It handles cookie comming from user browser and also to set cookie
app.use(express.static('public'))


// Routes import

import user from "./routes/user.route.js"

app.use("/api/user", user) // -> https://localhost:3000/api/user/register


export  {app}