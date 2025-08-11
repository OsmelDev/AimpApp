const express = require("express");
const { save, load, streamSong } = require("../controllers/playlist.controller");
const route = express.Router()
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

route.post("/save", upload.array('songs'), save)
route.get("/load", load)
route.get('/songs/stream/:id', streamSong);

module.exports = route