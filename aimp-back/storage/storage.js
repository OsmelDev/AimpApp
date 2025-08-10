const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { 
    fileSize: 30 * 1024 * 1024, 
    files: 20 
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'audio/mpeg',
      'audio/wav', 
      'audio/webm',
      'audio/ogg', 
      'audio/aac', 
      'audio/x-m4a'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      console.log("loinclulle")
      cb(null, true);
    } else {
      cb(new Error(`Tipo de archivo no soportado: ${file.mimetype}`), false);
    }
  }
}).fields([
  { name: 'songs', maxCount: 20 }, // Archivos de audio
  // { name: 'coverImage', maxCount: 1 } // Opcional: imagen de portada
]);

module.exports = upload;