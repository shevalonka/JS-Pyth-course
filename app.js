import sqlite3 from "sqlite3";
import express from "express";
import nunjucks from "nunjucks";
import session from "express-session";
import bcrypt from "bcryptjs";
import * as Passwords from "./lib/password.js";
import * as Db from "./lib/db.js"

let app = express();
let PORT = 3000;

nunjucks.configure('templates', {
    autoescape: true,
    express: app,
    watch: true // reload templates on change
});
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Minimal session storage (it's bad, use something better later)
app.use(session({
    secret: 'this should be a proper secret',
    cookie: {
      maxAge: 60000,
      // sameSite: "strict", // SameSite attribute in cookies mitigate CSRF
    }
  }));
  

app.use("/public", express.static('statics'));

app.get('/login', function(req, res) {
    res.render('index.njk');
});

app.post('/login', async (req, res) =>{
    let user = await Db.getUserByEmail(req.body.email);
    if (user && await Passwords.compare(req.body.password, user.password))
    {
        req.session.user_id = user.user_id;
        console.log("logged in successfully");
        res.redirect("/home");
    } else {
        res.render("index.njk", {message: "!!!W R O N G credentials!!!"});
    }
})

app.get("/logout", (req, res)=>{
    req.session.user_id = undefined;
    res.redirect("/login");
});

app.get('/register', function(req, res) {
    res.render('register.njk');
});


app.get('/home', async(req,res)=>{
    if (req.session.user_id !== undefined) {
        try {
            let name = await Db.getNameByUserId(req.session.user_id);
            console.log(name);
            res.render("home.njk", { greet: `${name}` });
        } catch (error) {
            console.error("Error fetching name: ", error);
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
})


app.post("/register", async (req, res)=>{
    if(req.body.password !== req.body["repeat-password"]){
        res.render("register.njk", {message: "Passwords do not match"});
        return;
    }
    try{
        let salt = await Passwords.genSalt(10);
        let hashedPass = await Passwords.hash(req.body.password, salt);
        req.body.password = hashedPass;

        // Promise based bcrypt module
        // Maybe the API has support for promises by default, you should check that.
        
        await Db.createUser(req.body);
        // TODO: Registered properly, what should I do now??
        res.redirect("/login");
    } catch (error){
        console.log(error);
    }
});


app.listen(PORT, ()=>{
    console.log("listening in port", PORT);
});




