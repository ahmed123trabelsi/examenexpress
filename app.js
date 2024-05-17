var http=require("http")
var express=require("express")
var mongoose=require("mongoose")
var path=require('path')
/* const { socketIO }= require('./services/partieService') */
var mongoConfig= require("./config/mongoConfig.json")
var controllerRoutes=require('./controllers/controller')
var controllerRoutes2=require('./controllers/controller2')
const { socketIO }= require('./services/service')
var app=express()
app.set('views',path.join(__dirname,'views'))
app.set('view engine','twig')
app.use(express.json())
app.use(express.static('public'))

app.use('/hotels',controllerRoutes)
app.use('/chambres',controllerRoutes2)

mongoose.connect(mongoConfig.uri)
  .then(() => {
    console.log("db connect");
  })
  .catch((err) => {
    console.log("db error: " + err);
  });
var server=http.createServer(app)

socketIO(server)

server.listen(3000,()=>{
    console.log("server started   ");
})