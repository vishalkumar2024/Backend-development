const express = require('express')
const app = express()

// When data (like login/Signup credentials) is sent from the frontend to backend, it is not sent as raw plain text inside the network request body. Instead, it is sent in a structured format like JSON or URL-encoded form data, depending on how the frontend sends it.
// However, by default, Express.js does not automatically parse the incoming request body. That’s why we use these two middleware functions:

app.use(express.json()); // To parse JSON payloads
app.use(express.urlencoded({extended:true})); // To parse URL-encoded form data 


//Middleware  -> frontend(client) sends request to server but before reaching it to the route it encounters with middlewares , and do some tasks, then next() function sends this request to next one which can either be another middleware or desired route.

// Here in this case request came here in the server , firstly encountered with 1st middleware and printed "1st Middleware is run" and then next() function ran , therefore the request is sent to second middleware, this printed "2nd middleware is run" and ran next() function . finally request went into desired route it will do some task and this will show in frontend

// 1st Middleware
app.use(function (req, res, next) {
    console.log("1st Middleware is run")
    next();
})
// 2nd middleware
app.use((req, res, next) => {
    console.log("2nd Middleware is run");
    next();
})

app.get("/", function (req, res) {  // In '/' Route "Express.js is working" is showing in frontend
    res.send("Express.js is working");
})

app.get("/app", function (req, res) {    // In '/app' Route "Express.js is working" is showing in frontend
    res.send("Express.js is working on app Route");
})

app.get("/profile", function (req, res,next) {
    return next(new Error("This profile route is still in building phase"))
})

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Oops!, profile is still in building phase')
})

app.listen(3000);
