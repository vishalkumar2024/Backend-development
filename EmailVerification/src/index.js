import express from 'express';
import env from 'dotenv'
import dbConnection from './config/db.config.js';
import router from './routes/Auth.routes.js';

const app = express()
env.config({
   path: './env'
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

 

app.use('/api/auth', router)

const port = process.env.port || 5000

dbConnection().then(() => {
   app.listen(`${port}` || 8000, () => {
      console.log(`SERVER is running at port - ${port}`)
   })
})
   .catch((error) => {
      console.log("Could not connect to mongoDB", error)
   });

