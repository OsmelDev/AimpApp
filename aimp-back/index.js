const express = require('express')
const morgan = require('morgan');
const playListRoute = require('../aimp-back/routes/playlist.routes');
const { db } = require('./database/db');
const cors = require('cors');
const { PORT } = require('./config');

const app = express()

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ 
  origin: "http://localhost:4000",
  credentials: true
}))
app.use("/playlist", playListRoute);

app.listen(PORT,() => {
  console.log(`server listening on port http://localhost:${PORT}`);
  db()
})
