import mongoose from "mongoose";

const songs = new mongoose.Schema(
    {
        songname :{
            type:String,
            required : true,
        },
        
        film:{
            type:String,
            required:true,
        } ,
        director:{
            type:String,
            required:true,
        },
        singer:{
            type:String,
            required : true,
        },
        actor:{
            type:String,
            default : '',
        },
        actress:{
            type:String,
            default : '',
        }
    }
);

const Songs = mongoose.model("Songs" , songs);

export default Songs;


