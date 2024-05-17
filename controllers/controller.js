var express= require("express")
var Service=require("../services/service")
const validate = require("../middelware/validate");
var router=express.Router()
router.post("/add/", validate,Service.addHotel)
router.get("/list",Service.list)
router.get("/getbyid/:id", Service.listbyid)
router.delete("/delete/:id", Service.deleteByid)

router.get('/test',(req,res)=>{res.render('index')}) 
module.exports = router;