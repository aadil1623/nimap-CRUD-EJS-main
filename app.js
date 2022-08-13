const express=require('express');
const bodyparser=require('body-parser');
const categoryRoutes=require("./routes/category")
const productRoutes=require("./routes/product")
const connectToMongo = require("./database")
const override=require("method-override");

const app=express();

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(override('_method'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


connectToMongo();

// server start redirection
app.get("/",(req,res)=>{
    res.redirect("/category");
})


app.use("/category",categoryRoutes);
app.use("/product",productRoutes);

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });