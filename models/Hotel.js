var mongoose=require("mongoose")
var Schema=mongoose.Schema

var Hotel=new Schema({
    nom:String,
    adresse: String,
    nbChambre: Number,
    email: String,
})

module.exports= mongoose.model("Hotel",Hotel)