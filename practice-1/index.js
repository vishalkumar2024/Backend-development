const express= require("express");
const app=express();
const path=require('path');

// rule 1
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//rule 3
app.use(express.static(path.join(__dirname,'public')));  // Here  __dirname is the path from root to current folder (Here it is practice-1) means C:\Users\acer\OneDrive\Desktop\Backend\practice-1
// app.use(express.static((__dirname + '/public')));

// rule 2.b
app.set('view engine','ejs') 



app.get("/",function(req,res){ 
    res.render("index");
})

// Dynamic Routing
app.get("/profile/:username",function(req,res){ 
    res.send(`Hey there, this is ${req.params.username}`); //Hey there, this is :vishal
})
app.get("/profile/:username/:age",function(req,res){ 
    res.send(`Hey there, this is ${req.params.username} whose age is ${req.params.age}`);
})

//Port
app.listen(5000,function(){
    console.log("project is running properly in 5000 port")
})