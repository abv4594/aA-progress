// Phase 2
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId
} = require('./data');

const express = require('express');
const app = express();

// Your code here
app.use(express.json());

app.use(((req, res, next)=> {
  console.log('Body:', req.body);
  next();
}))

app.get('/artists/:id', (req, res) => {
  res.json(getArtistByArtistId(req.params.id));
});

app.get('/artists', (req, res) => {
  res.status(200);
  res.set('Content-Type', 'application/json');
  res.send(getAllArtists());
})

app.get('/artists/latest', (req, res) => {
  res.status(200);
  res.set('Content-Type', 'application/json');
  res.send(getLatestArtist());
})

app.get('/artists/latest/albums', (req, res) => {
  res.status(200);
  res.set('Content-Type', 'application/json');
  res.send(getAlbumsForLatestArtist());
})

app.post('/artists', (req, res)=> {
  res.status(201);
  res.set('Content-Type', 'application/json');
  res.send(addArtist(req.body));
})

app.put('/artists/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  res.json(editArtistByArtistId(id, data));
})

// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}