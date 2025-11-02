import dotenv from 'dotenv'
dotenv.config({})
import connections from './db/practice.js'
import {app} from './app.js'

connections()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`SERVER is running at port - ${process.env.PORT}`)

        })
    })
    .catch((error) => {
        console.log(`MongoDB connection failed, error - ${error}`)
    })

    