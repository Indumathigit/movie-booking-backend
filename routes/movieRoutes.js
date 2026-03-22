var express = require("express")
var router = express.Router()
var movieController = require("../controllers/movieController")

router.get("/", movieController.getAllMovies)
router.get("/:id", movieController.getMovieById)
router.post("/", movieController.createMovie)
router.put("/:id", movieController.updateMovie)
router.delete("/:id", movieController.deleteMovie)

module.exports = router