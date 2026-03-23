 
var express = require("express")
var router = express.Router()
var theaterController = require("../controllers/theaterController")

router.get("/", theaterController.getAllTheaters)
router.post("/", theaterController.createTheater)
router.delete("/:id", theaterController.deleteTheater)

module.exports = router