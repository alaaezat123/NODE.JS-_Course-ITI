const express = require('express');
const app = express();

// app.get("/test", (req, res) => {
//   res.send("hi lloloyy");
// });

app.get("/test2", (req, res) => {
    res.render("file.ejs", { name: "Ahmed" });
  });

//   app.get("/test3", (req, res) => {
//     res.send("hi lloloyy3");
//   });

//   app.post("/test5", (req, res) => {
//     res.render("file.ejs");
//   });



app.listen(5001, () => {
  console.log("Server is running on port 5000");
});