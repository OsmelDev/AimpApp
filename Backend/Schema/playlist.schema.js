const mongoose = require('mongoose')
const db = require('../database/db')

const playlistSchema = new mongoose.Schema({
  name: String,
  createdAt: Date,
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
});

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist