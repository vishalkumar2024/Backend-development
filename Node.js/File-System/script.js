const fs = require('node:fs');

// // // writeFile
// fs.writeFile("copy3.html", "This is another HTML file", function (err) {
//     if (err) {
//         return err
//     } else {
//         console.log("writeFile done")
//     }
// })
// fs.writeFile("index2.html", "This file is gonna delete", function (err) {
//     if (err) {
//         return err
//     } else {
//         console.log("writeFile done")
//     }
// })


// // //appendFile
// fs.appendFile("index.js", " - Created using Node.js", function (err) {
//     if (err) {
//         return err
//     } else {
//         console.log("appendFile done")
//     }
// })


// // // rename
// // fs.rename("index.js", "index.txt", function (err) {
// //     if (err) {
// //         return err
// //     } else {
// //         console.log("Rename done")
// //     }
// // })


// // // copyFile
// // fs.copyFile("index.txt", "./copy/copy.html", function(err){
// //       if (err) {
// //         return err
// //     } else {
// //         console.log("copyFile done")
// //     }
// // })



// // // unlink
// // fs.unlink("index2.html", function (err) {
// //     if (err) {
// //         return err
// //     } else {
// //         console.log("unlink done")
// //     }
// // })


// // // rmdir
// // fs.rmdir("./rmdir-folder",{recursive:true}, function(err){
// //      if (err) {
// //         return err
// //     } else {
// //         console.log("rmdir done")
// //     }
// // })


// fs.mkdir("myfolder", function (err) {
//     if (err) {
//         return err
//     } else {
//         console.log("mkdir done")
//     }
// })


// fs.readFile("./index.txt",'utf8', (err,data) => {
//     if (err) {
//         return err
//     } else {
//         console.log(data)
//     }
// })

// fs.readdir("./copy",(err,data)=>{
//      if (err) {
//         return err
//     } else {
//         console.log(data)
//     }
// })
// it returns the array of the files inside the directory

// fs.exists('./index.txt',function (err) {
//   console.log(err ? 'it exists' : 'no passwd!');
// })
