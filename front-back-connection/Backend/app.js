import express from "express"
const app = express();

import dotenv from 'dotenv';
dotenv.config();

// import cors from 'cors';
// app.use(cors());


app.get('/', (req, res) => {
    res.send("Server is running fine");
})

app.get('/api/texts', (req, res) => {
    const texts = [
        {
            id: 1,
            text: "Learn JavaScript",
            description: "Understand the basics of JavaScript, including variables, functions, and loops."
        },
        {
            id: 2,
            text: "Master DOM Manipulation",
            description: "Learn how to dynamically modify HTML and CSS through the Document Object Model."
        },
        {
            id: 3,
            text: "Explore React.js",
            description: "Dive into component-based architecture and state management using React."
        },
        {
            id: 4,
            text: "Work with Node.js",
            description: "Gain backend development skills by learning how to create APIs using Node.js and Express."
        },
        {
            id: 5,
            text: "Understand MongoDB",
            description: "Study how to store and manage data using MongoDB’s NoSQL database structure."
        }
    ];

    res.send(texts);

})

const port = process.env.PORT || 4000;

app.listen(port, (err) => {
    if (err) console.log(err)
    console.log(`Server is runnig at ${port}`)
})