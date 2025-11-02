import express from 'express'
const app = express()

import cookieParser from 'cookie-parser'
import cors from 'cors'

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true,
}))

app.use(express.json({ limit: '16kb' })) // It handles the json data comming from req.params
app.use(express.urlencoded({ extended: true }, { limit: '16kb' })) // It handles data comming from any link
app.use(cookieParser())      // It handles cookie comming from user browser and also to set cookie
app.use(express.static('public'))




export  {app}