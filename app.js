const express = require("express");
const bodyParser = require("body-parser");
const truncate = require("truncate-html");

const app = express();
const reminder_database = [];
const users = []


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
  res.render("home");
});

app.get("/newReminder", function(req, res){
  res.render("newReminder");
});


app.get("/activity", function(req, res){
  res.render("activity", {
    reminder_database : reminder_database
  });
});

app.post("/newReminder", function(req, res){
  const reminder = {
    // Data gotten from the newReminder page
    reminder_title : req.body.reminder_title,
    reminder_details : req.body.reminder_details,
    start_date : req.body.Appointment_time_starts,
    end_date : req.body.Appointment_time_ends
  }

  reminder_database.push(reminder);
  console.log(reminder);
  res.redirect("/activity");
})

app.get("/signIn", function(req, res){
  res.render("signIn");
});

app.post("/signIn", function(req, res){
  const email = req.body.email;
  const password = req.body.Password;
  /*if (email and password in users database){
    log user in
    res.redirect("/activity")
  }*/
})

app.get("/signUp", function(req, res){
  res.render("signUp");
});

app.post("/signUp", function(req, res){
  // Data gotten from SignUp page
  const email = req.body.Email;
  const name = req.body.firstName;
  if ((req.body.Password == req.body.confirmPassword) && (req.body.Password.length >= 8)){
    // for password authentication
    const password = req.body.Password;
    const user = {
      name:name,
      email : email,
      password : pasword
    }
    users.push(user);
    console.log(user)

  } else {
    // incase of failure, redirects user to Homepage
    res.redirect("/");
  }
})


app.listen(3000, function(){
  console.log("Server started on port 3000");
});
