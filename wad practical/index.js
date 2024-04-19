import express from "express";
import mongoose from "mongoose";
import User from "./model.js";
import bodyParser from "body-parser";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", "./views");



mongoose
  .connect("mongodb://127.0.0.1:27017/wadl")
  .then(() => {
    console.log("connected to monogo");
  })
  .catch((err) => {
    console.log(err);
  });

  app.listen(3000, () => {
    console.log("server is running");
  });

// const data = User.create({
//   studentname:"pratik",
//   CC_marks:30,
//   CNS_marks:30,
//   DSBDA_marks:30,
//   WAD_marks:30
// });



app.get("/", async (req, res) => {
  res.render("home");
});

// app.post("/addmarks", async (req, res) => {
//   const { stname, cc, cns, wad, dsbda } = req.body;
//   const newuser = User.create({
//     studentname:stname,
//     CC_marks:cc,
//     CNS_marks:cns,
//     DSBDA_marks:dsbda,
//     WAD_marks:wad
//   });
//   try {
//     // await newuser.save();
//     // alert("Added successfully");
//     res.render("table", { data: newuser });
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.post("/addmarks", (req, res) => {
//   console.log(req.body);
//   var myData = new User(req.body);
//   myData
//     .save()
//     .then((item) => {
//       console.log("item saved to database");
//       res.redirect("/getMarks");
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).send("unable to save to database");
//     });
// });


app.get("/getMarks", (req, res) => {
  console.log(req.query);
  User.find(req.query)
    .then((student) => {
      res.render("table", { data: student });
    })
    .catch((err) => {
      res.json({ message: "err" });
    });
});


app.post("/addmarks", async (req, res) => {
  try {
    // Extract student details from request body
    const { studentname, cns, wad, cc, dsbda } = req.body;

    // Validate and convert marks to numbers
    const CNS_marks = parseInt(cns);
    const WAD_marks = parseInt(wad);
    const CC_marks = parseInt(cc);
    const DSBDA_marks = parseInt(dsbda);

    // Check if conversion was successful
    if (isNaN(CNS_marks) || isNaN(WAD_marks) || isNaN(CC_marks) || isNaN(DSBDA_marks)) {
      throw new Error("Invalid marks input");
    }

    // Create a new Student instance
    const newStudent = new User({
      studentname,
      CNS_marks,
      WAD_marks,
      CC_marks,
      DSBDA_marks
    });

    // Save the Student instance to the database
    await newStudent.save();

    console.log("Student marks saved to database");
    res.redirect("/getMarks");
  } catch (err) {
    console.error("Error saving student marks:", err);
    res.status(400).send("Failed to save student marks: " + err.message);
  }
});


// Inside your route handler for GET '/getMarks'
// app.get("/getMarks", async (req, res) => {
//   try {
//     const students = await User.find(); // Retrieve all students from MongoDB
//     res.render("table", { data: students }); // Render 'table.ejs' with 'students' data
//   } catch (err) {
//     console.error("Error fetching student marks:", err);
//     res.status(500).send("Failed to fetch student marks");
//   }
// });

app.post("/deleteStudent/:id", (req, res) => {
  console.log(req.params.id);
  User.findByIdAndDelete(req.params.id).then((student) => {
    console.log("Deleted Successfully");
    res.redirect("/getMarks");
  });
});

app.get("/dsbdaGreaterThan20", (req, res) => {
  User.find({ DSBDA_marks: { $gt: 20 } })
    .then((student) => {
      res.render("table", { data: student });
    })
    .catch((err) => {
      res.json({ message: "err" });
    });
});

app.get("/wadccGreaterThan40", (req, res) => {
  User.find({ WAD_marks: { $gt: 40 }, CC_marks: { $gt: 40 } })
    .then((student) => {
      res.render("table", { data: student });
    })
    .catch((err) => {
      res.json({ message: "err" });
    });
});
