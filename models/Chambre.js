var mongoose=require("mongoose")
var Schema=mongoose.Schema

var Chambre=new Schema({
    numero:Number,
    hotel: String,
    reservee: String,
    nom_client: String,
})

module.exports= mongoose.model("Chambre",Chambre)