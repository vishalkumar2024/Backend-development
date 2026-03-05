import express from 'express'
const app = express()

//Middlewares
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true }, { limit: '16kb' })) 
app.use(express.static('public'))


// Routes import
import file from "./routes/file.route.js"

// Routes implementation
app.use("/api/user", file)


export  {app}