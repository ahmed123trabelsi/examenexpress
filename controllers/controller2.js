var express= require("express")
var Service=require("../services/service")
const validate = require("../middelware/validate");
var router=express.Router()

router.post("/add/:hotel", Service.ajouterCAuH)
router.put("/reserve/:id/:nom", Service.reserve)

module.exports = router;