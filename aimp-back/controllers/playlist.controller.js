const Playlist = require("../Schema/playlist.schema");
const Song = require("../Schema/song.schema");
const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");

let bucket;
mongoose.connection.once('open', () => {
  bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: 'songs'
  });
});

const save = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No se subieron archivos" });
    }

    const { name, createdAt, songsMetadata } = req.body;
    const metadata = JSON.parse(songsMetadata);

    if (req.files.length !== metadata.length) {
      return res.status(400).json({ 
        message: "La cantidad de archivos no coincide con los metadatos"
      });
    }

    const savedSongs = await Promise.all(
      req.files.map(async (file, i) => {
        return new Promise((resolve, reject) => {
          const uploadStream = bucket.openUploadStream(
            `${Date.now()}-${file.originalname}`,
            {
              metadata: {
                title: metadata[i].title,
                artist: metadata[i].artist || 'Unknown',
                duration: metadata[i].duration || 0,
                originalName: file.originalname,
                contentType: file.mimetype
              }
            }
          );

          uploadStream.write(file.buffer);
          uploadStream.end();

          uploadStream.on('finish', () => {
            const song = new Song({
              fileId: uploadStream.id,
              filename: uploadStream.filename,
              metadata: uploadStream.options.metadata,
            });

            song.save()
              .then(() => resolve({
                id: song._id,
                fileId: uploadStream.id,
                filename: uploadStream.filename,
                path: `http://localhost:3128/playlist/songs/stream/${uploadStream.id}`,
                metadata: uploadStream.options.metadata
              }))
              .catch(reject);
          });

          uploadStream.on('error', reject);
        });
      })
    );

    const playlist = new Playlist({
      name,
      createdAt: new Date(createdAt),
      songs: savedSongs.map(song => song.id),
    });

    await playlist.save();

    res.status(201).json({ 
      message: "Playlist creada exitosamente",
      playlist: {
        id: playlist._id,
        name: playlist.name,
        createdAt: playlist.createdAt,
        songs: savedSongs
      }
    });

  } catch (error) {
    res.status(500).json({ 
      error: "Error interno del servidor",
      details: error.message 
    });
  }
};

const load = async (req, res) => {
  try {
    const playLists = await Playlist.find().populate({
      path: "songs",
      select: "fileId filename metadata",
      options: { sort: { createdAt: 1 } }
    });

    if (!playLists || playLists.length === 0) {
      return res.status(404).json({ 
        message: "No hay listas de reproducción disponibles" 
      });
    }

    const formattedPlaylists = playLists.map((playlist) => ({
      id: playlist._id,
      name: playlist.name,
      createdAt: playlist.createdAt,
      songs: playlist.songs.map((song) => ({
        id: song._id,
        fileId: song.fileId,
        filename: song.filename,
        path: `http://localhost:3128/playlist/songs/stream/${song.fileId}`,
        metadata: song.metadata
      }))
    }));

    return res.status(200).json(formattedPlaylists);
  } catch (error) {
    console.error("Error al cargar las playlists:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
      details: error.message,
    });
  }
};

const streamSong = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findOne({ fileId: id });

    if (!song) {
      return res.status(404).json({ error: "Canción no encontrada" });
    }

    const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(id));
    
    res.set({
      'Content-Type': song.metadata.contentType || 'audio/mpeg',
      'Content-Disposition': `inline; filename="${song.metadata.originalName || song.filename}"`
    });

    downloadStream.pipe(res);
    
    downloadStream.on('error', () => {
      res.status(404).send('Archivo no encontrado');
    });

  } catch (error) {
    res.status(500).json({
      error: "Error al reproducir canción",
      details: error.message,
    });
  }
};

module.exports = { save, load, streamSong };