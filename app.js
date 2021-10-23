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
  const number_of_reminders_in_database = reminder_database.length;
  const initial_id = 0;
  const starting_number = 1;
  var title = "title" + starting_number.toString();
  var details = "details" + starting_number.toString();
  if (number_of_reminders_in_database >= starting_number){

    while (number_of_reminders_in_database > starting_number) {
      res.render("activity", {
        [title] : reminder_database[initial_id].reminder_title,
        [details] : reminder_database[initial_id].reminder_details
      });
      initial_id += 1;
      starting_number += 1;
    }
    res.render("activity", {
      [title] : reminder_database[initial_id].reminder_title,
      [details] : reminder_database[initial_id].reminder_details
    });
  }  else{
    var title = "title0";
    var details = "details0";
    res.render("activity", {
      [title] : "No Reminders",
      [details] : "..."
    });
  }

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
