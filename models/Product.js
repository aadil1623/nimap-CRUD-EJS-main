const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    id:String,
    name:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    // catid:{
    //     type:String,
    // },
    // catname:
    // {
    //     type:String
    // }
})

module.exports=mongoose.model("product",productSchema);