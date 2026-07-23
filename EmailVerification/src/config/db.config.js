import express from 'express'
import mongoose from 'mongoose'


const dbConnection = async () => {
    try {
        let connectionInstence = await mongoose.connect(`${process.env.mongoDB_url}`)
        console.log(`\n MongoDB is connected Successfully | DB_host = ${connectionInstence.connection.host} | DB_port = ${connectionInstence.connection.port} | DB_name = ${connectionInstence.connection.name}\n`)

    } catch (error) {
        console.error('MongoDB connection error -', error)
        process.exit(1);
    }
}

export default dbConnection;