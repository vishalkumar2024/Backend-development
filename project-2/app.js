const express = require('express')
const app = express();

const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const upload = require('./config/multerConfig')

const userModel = require("./Model/user");
const postModel = require("./Model/post");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.set("view engine", "ejs")
app.use(cookieParser())


app.get('/', (req, res) => {
    res.render("index");
})

app.post('/register', async (req, res) => {
    try {
        const { username, name, email, age, password } = req.body;

        // Check if user already exists
        const ThisUser = await userModel.findOne({ email });
        if (ThisUser)
            return res.status(400).send("User already exists with this email");

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                const createdUser = await userModel.create({
                    username,
                    name,
                    email,
                    age,
                    password: hash,
                });

                const token = jwt.sign(
                    { email: createdUser.email, userId: createdUser._id },
                    process.env.JWT_SECRET || "Secret",
                );

                res.cookie("token", token, { httpOnly: true, secure: true });

                res.render('profile', { user: createdUser })
            })
        })
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});



app.get('/login', (req, res) => {
    res.render("login")
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) return res.status(500).send("No user found");

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {

            let token = jwt.sign({ email: email, userId: user._id }, "Secret");
            res.cookie("token", token);

            res.status(200).redirect("profile");
        }
        else res.redirect("/login")
    })
})

app.get('/logout', (req, res) => {
    res.cookie("token", "");
    res.redirect("/login")
})

app.get('/profile', isLoggedIn, async (req, res) => { // '.profile' is a protected route by a middleware i.e isLoggedIn
    let ThisUser = await userModel.findOne({ email: req.user.email }).populate("post")
    res.render("profile", { user: ThisUser })
})

app.post('/post', isLoggedIn, async (req, res) => { // '.profile' is a protected route by a middleware i.e isLoggedIn
    let ThisUser = await userModel.findOne({ email: req.user.email })
    let newPost = await postModel.create({
        user: ThisUser._id,
        content: req.body.content,
    })

    ThisUser.post.push(newPost._id)
    await ThisUser.save();
    res.redirect("/profile")
})

app.get('/like/:id', isLoggedIn, async (req, res) => {
    let ThisPost = await postModel.findOne({ _id: req.params.id }).populate("user");

    if (ThisPost.likes.indexOf(req.user.userId) == -1) {
        ThisPost.likes.push(req.user.userId)
    } else {
        ThisPost.likes.splice(ThisPost.likes.indexOf(req.user.userId), 1)
    }

    await ThisPost.save();
    res.redirect("/profile")
})

app.get('/edit/:PostId', async (req, res) => {
    let ThisPost = await postModel.findOne({ _id: req.params.PostId }).populate("user");
    res.render("edit", ThisPost = { ThisPost })
})

app.post('/update/:postId', isLoggedIn, async (req, res) => {
    let { content } = req.body;
    await postModel.findOneAndUpdate({ _id: req.params.postId }, { content })

    res.redirect('/profile')

})

app.get('/delete/:postId', isLoggedIn, async (req, res) => {
    await postModel.findOneAndDelete({ _id: req.params.postId })
    res.redirect('/profile')

})

app.get('/profilePic', (req, res) => {
    res.render('profilePic')
})

app.post('/uploadFile', isLoggedIn, upload.single('newFile'), async (req, res) => {
    let ThisUser = await userModel.findOne({ _id: req.user.userId }).populate("post");
    if (req.file.filename) {
        ThisUser.profilePicture = req.file.filename;
        await ThisUser.save()
    }

    res.redirect('/profile')
})

function isLoggedIn(req, res, next) {  //This is a middleware
    if (req.cookies.token === "") return res.send("You need to LogIn")
    else {
        let data = jwt.verify(req.cookies.token, "Secret",)
        req.user = data
        next();
    }
}


app.listen(3000, (err) => {
    if (err) console.log(err)
})
