import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
    {
        studentname : {
            type:String,
            required:true
        },
        CNS_marks:{
            type:Number,
            required:true
        },
        WAD_marks:{
            type:Number,
            required:true
        },
        CC_marks:{
            type:Number,
            required:true
        },
        DSBDA_marks:{
            type:Number,
            required:true
        }
    },
    {
        timestamp:true,
    }

);

const User = mongoose.model('Students' , StudentSchema);

export default User;