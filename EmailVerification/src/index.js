import express from 'express';
import env from 'dotenv'

const app = express()
env.config({
   path:'./env'
})

const port = process.env.port || 5000

app.listen(port,()=>{
   console.log(`app is running fine on port ${port}`)
})