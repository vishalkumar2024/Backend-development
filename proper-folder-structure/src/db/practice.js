import mongoose from 'mongoose'
import { DB_name } from '../constants.js'


const connections = async () => {
    try {
        const connectionInstence = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_name}`)

        console.log(`MongoDB is connected Successfully | DB_host = ${connectionInstence.connection.host} | DB_port = ${connectionInstence.connection.port} | DB_name = ${connectionInstence.connection.name}`) // mongoose.connections is basically an array that stores all the active connection objects that Mongoose currently has open.This array contains [host, port, name, readyState ]

    } catch (error) {
        console.error('MongoDB connection error -', error)
        process.exit(1);
    }
}

export default connections;
