const mongoose=require("mongoose");
const product=require("./Product")


//Category Schema

const categorySchema=new mongoose.Schema({
    id:String,
    name:{
        type:String,
        required:[true,'please provide category name']
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    }]
})

//delete all products belonging to a category along with the category

categorySchema.post('findOneAndDelete', async function (category) {
    if (category.products.length) {
        const res = await product.deleteMany({ _id: { $in: category.products } });
    }
})


module.exports=mongoose.model("category",categorySchema);