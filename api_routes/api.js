const router = require("express").Router()
const checkSongExist = require("./controllers/checkSongExist")
const addNewSong = require("./controllers/addNewSong")
const writerAutocomplete = require("./controllers/writerAutocomplete")

router.post("/songs", addNewSong)
router.post("/check", checkSongExist)
router.get("/writer-autocomplete/:query", writerAutocomplete)

module.exports = router