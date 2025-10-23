const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


app.get("/", function (req, res) {
    fs.readdir('./Files', function (err, files) {
        res.render("index", { allFiles: files });
    })
}) 


app.post("/create", function (req, res) {
    fs.writeFile(`./Files/${req.body.title.split(" ").join("")}.txt`, req.body.details, function (err) {
        res.redirect("/");
    })
})


app.get('/files/:filename', function (req, res) {
    const safeFileName = req.params.filename.replace(/^:/, '').trim();  // removes leading colon
    fs.readFile(`./Files/${safeFileName}`, 'utf-8', function (err, filedata) {
        if (err) { console.log(err) }
        res.render('show', { Filename: (safeFileName), Filedetail: filedata })
    })
})


app.get('/edit/:editfile', function (req, res) {
    res.render('edit', { previousName: (req.params.editfile).slice(1) })
})


app.post("/editFeature", function (req, res) {
    fs.rename(`./Files/${req.body.previous.trim()}`, `./Files/${req.body.new.trim()}`, function (err) {
        if (err) { console.log(err) }
        res.redirect('/')
    })
})
// This happening fs.rename('./Files/newTask.txt','./Files/newTask.js',function(){}) 


app.get('/delete/:deletefile', function (req, res) {
    let temp = req.params.deletefile.replace(/^:/, '').trim();
    fs.unlink(`./Files/${temp}`, function (err) {
        if (err) console.log(err);
        else {
            res.redirect('/');
        }
    })
})



app.listen(3000, () => {
    console.log("project 1 is running properly in port 3000")
})