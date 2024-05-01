import express from "express";
import mongoose from "mongoose";
import Songs from "./model.js";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.listen(3000 , ()=>{
    console.log("server started successfuly");
});

mongoose.connect("mongodb://127.0.0.1:27017/songs")
.then(()=>{
    console.log("monogo connected successfully");
})
.catch((err)=>{
    console.log("error connecteing mongodb");
})

app.set("view engine" , "ejs");
app.set("views" , "./views");

app.get('/' , async (req,res)=>{
    res.render("home");
});

app.post('/addsong' , async (req,res)=>{
    try{
        const data = new Songs(req.body);
        await data.save();
        res.redirect("/songs");
    }catch(err){
        console.log("Error in adding data" , err);
        res.send("Error adding the song");
    }
});

app.get("/songs" , async (req,res)=>{
    // console.log(req.query);
    Songs.find()
    .then((song)=>{
        const cnt = song.length;
        res.render("table" , {data : song , tablecount : cnt});
    })
    .catch((err)=>{
        console.log(err);
        res.json({message:"error"});
    })

});

app.post("/deletesong/:id" , async (req,res)=>{
    console.log(req.params);
    const {id} = req.params;
    try{
        await Songs.findOneAndDelete(id);
        res.redirect("/songs");
    }
    catch(error){
        console.log(error);
        res.send("error in deleting the song");
    }
});

app.get("/songbydirector/:director" , (req,res)=>{
    const {director} = req.params;
    Songs.find({director : director})
    .then((song)=>{
        res.render("table" , {data : song , tablecount:song.length});
    })
    .catch((err)=>{
        console.log(err);
        res.send("error");
    })
});

app.get("/songbydirectorsinger/:director/:singer" , (req,res)=>{
    const {director , singer} = req.params;
    Songs.find({director : director , singer : singer})
    .then((song)=>{
        res.render("table" , {data : song , tablecount:song.length});
    })
    .catch((err)=>{
        console.log(err);
        res.send("Error in finding");
    })
});

app.get("/songbysingerfilm/:singer/:film" , (req,res)=>{
    const { singer,film} = req.params;
    Songs.find({singer : singer , film:film})
    .then((song)=>{
        res.render("table" , {data : song , tablecount:song.length});
    })
    .catch((err)=>{
        console.log(err);
        res.send("Error in finding");
    })
});


app.put("/update/:name" , async (req,res)=>{
    try{
        const {name } = req.params;
        const {actor , actress} = req.body;

        const song = await Songs.findOneAndUpdate(
            name,
            {#set : {actor : actor , actre}}
        )
    }
})