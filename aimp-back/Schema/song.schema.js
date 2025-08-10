const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  metadata: {
    title: String,
    artist: String,
    duration: String,
    originalName: String,
    contentType: String
  },
  path:String
}, { timestamps: true });

module.exports = mongoose.model('Song', songSchema);