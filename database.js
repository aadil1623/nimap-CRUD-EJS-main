const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/nimaptest";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false}, ()=>{
        console.log("database success");
    })
}
module.exports = connectToMongo;