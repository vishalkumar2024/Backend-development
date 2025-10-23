const express = require('express');
const app = express();
const path = require('path')
const userModel = require("./Models/user")


app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) { 
    res.render("index");
})

//Create
app.post('/create', async function (req, res) {
    const createdUser = await userModel.create({
        name: req.body.name,
        email: req.body.email,
        image: req.body.image
    })
    res.redirect("/read") 
})


app.get('/read', async function (req, res) {
    const allUsers = await userModel.find();
    res.render("read", users = allUsers);
})


// Delete
app.get('/delete/:deletingUser', async function (req, res) {
    await userModel.findOneAndDelete({ _id:req.params.deletingUser});

    res.redirect("/read")
})


// Edit
app.get('/edit/:editUser', async function (req, res) {
    const user = await userModel.findOne({ _id:req.params.editUser});
   
    res.render("edit",{user})
})


// Update
app.post('/update/:userId', async function (req, res) {
    const {name,email,image}=req.body
    await userModel.findOneAndUpdate({ _id:req.params.userId},{name:name,email:email,image:image});
    res.redirect("/read");
})

app.listen(3000);
