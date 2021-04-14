// setup for express
const express = require("express");
const app = express();

require('dotenv').config()
// console.log(process.env.PASSWORD)
const port = 3000;

// require some data form your data.js file
let {students, instructors, getStudents, getTeachers} = require('./data')

// just a simple middleware to show you how it works
// you will always see that console.log when you visit any page
app.use((req, res, next) => {
    console.log("Server running");
    next();
});

// letting your middleware know where to find all static files
app.use(express.static(__dirname + "/public"));

// giving instruction to express app
app.set('view engine','hbs')//telling express that the view 
//                            engine has hbs as extension
app.set('views', __dirname + '/views' )
let hbs = require('hbs')
hbs.registerPartials(__dirname + '/views/partials')

// ROUTES DEFINED BELOW

app.get("/", (req, res) => {
    // let filterdStudents = students.filter((singleStudent)=>{
    //     return singleStudent.city == 'Miami'
    // })
//     res.render('landing.hbs',/*object*/ {lastName: 'Sinanaj',
// age : 29, students:filterdStudents , layout : false})
getStudents()
.then((students)=>{
    res.render('landing.hbs', {lastName: 'Sinanaj', students})
})
.catch(()=>{
    console.log('Error')
})
});

app.get("/teachers", (req, res) => {
    //promises using 
    getTeachers()
    .then((teachers)=>{
        res.render('teachers.hbs',/*object*/ {instructors: teachers})
    })
    .catch(()=>{
        console.log('Error')
    })
    // res.render('teachers.hbs',/*object*/ {instructors})
});

// Express setup to listen for all client requests on a certain port
app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);