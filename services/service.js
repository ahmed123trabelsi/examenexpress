 var Hotel=require("../models/Hotel") 
 var Chambre=require("../models/Chambre") 
var socket=require("socket.io")
function socketIO(server){
    const io=  socket(server)
    io.on('connection',(socket)=>{
    /*     socket.broadcast.emit("msg","A new user is connected") */
    socket.on("afficher",async  (data)=>{
        await   Chambre.find({ reservee: "false" ,hotel:data.id1}).then((data,err) => {
           if(err){console.log(err)}
           else{      console.log('rr',data)
           io.emit("msg1",JSON.stringify(data))}

           })
        } );
        socket.on("reserver",async  (data)=>{
            try {
          
                let c = await Chambre.findById(data.id);
              
        
             c.nom_client=data.name
             c.reservee="true"
        
                await c.save();
                await io.emit("msg",JSON.stringify(c))
               
            } catch (err) {
                console.error("Erreur lors de l'ajout du con :", err);
             
            }
            } );

    })
}
async function  addHotel(c,res){
    await   new Hotel({
        nom:c.body.nom,
        adresse:c.body.adresse,
        email:c.body.email,
        nbChambre:0
      }).save().then((err,data)=>{console.log("hotel added"); res.send(data)})
   }
   list=(req,res,next)=>{
    Hotel.find().then((data,err)=>{
        if(err)
      { console.log(err)}
        else 
        {res.json(data)}

    })
}
listbyid=(req,res,next)=>{
    Hotel.findById(req.params.id).then((data,err)=>{
        if(err)
      { console.log(err)}
        else 
        {res.json(data)}

    })
}
async function  deleteByid(c,res){
    Hotel.findByIdAndDelete(c.params.id).then((err,data)=>{console.log("j deleted"); res.send('j deleted')})
    
    }
    async function ajouterCAuH(req, res) {
        try {
        

            let chambre = new Chambre({
                nom_client: "",
                reservee: "false",
                hotel: req.params.hotel,
                numero: req.body.numero,
            });
    
            let ChambreAjoute = await chambre.save();
            let hotel = await Hotel.findById(req.params.hotel);
            if (!hotel) {
                return res.status(404).send("hotel non trouvé.");
            }
         
            hotel.nbChambre += 1;
            await hotel.save();
    
          
    
         
            res.status(201).json(ChambreAjoute);
        } catch (err) {
            console.error("Erreur lors de l'ajout du niveau :", err);
            res.status(500).send(err);
        }
    }
    async function reserve(req, res) {
        try {
          
            let c = await Chambre.findById(req.params.id);
            if (!c) {
                return res.status(404).send("niveau non trouvé.");
            }
    
         c.nom_client=req.params.nom
         c.reservee="true"
    
            await c.save();

            res.status(201).json(c);
        } catch (err) {
            console.error("Erreur lors de l'ajout du con :", err);
            res.status(500).send(err);
        }
    }


module.exports={ socketIO,addHotel,list,listbyid,deleteByid,ajouterCAuH,reserve}