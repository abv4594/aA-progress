const http = require('http');
const fs = require('fs');

/* ============================ SERVER DATA ============================ */
let artists = JSON.parse(fs.readFileSync('./seeds/artists.json'));
let albums = JSON.parse(fs.readFileSync('./seeds/albums.json'));
let songs = JSON.parse(fs.readFileSync('./seeds/songs.json'));
let nextArtistId = 2;
let nextAlbumId = 2;
let nextSongId = 3;

// returns an artistId for a new artist
function getNewArtistId() {
  const newArtistId = nextArtistId;
  nextArtistId++;
  return newArtistId;
}

// returns an albumId for a new album
function getNewAlbumId() {
  const newAlbumId = nextAlbumId;
  nextAlbumId++;
  return newAlbumId;
}

// returns an songId for a new song
function getNewSongId() {
  const newSongId = nextSongId;
  nextSongId++;
  return newSongId;
}

/* ======================= PROCESS SERVER REQUESTS ======================= */
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // assemble the request body
  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => { // finished assembling the entire request body
    // Parsing the body of the request depending on the "Content-Type" header
    if (reqBody) {
      switch (req.headers['content-type']) {
        case "application/json":
          req.body = JSON.parse(reqBody);
          break;
        case "application/x-www-form-urlencoded":
          req.body = reqBody
            .split("&")
            .map((keyValuePair) => keyValuePair.split("="))
            .map(([key, value]) => [key, value.replace(/\+/g, " ")])
            .map(([key, value]) => [key, decodeURIComponent(value)])
            .reduce((acc, [key, value]) => {
              acc[key] = value;
              return acc;
            }, {});
          break;
        default:
          break;
      }
      console.log(req.body);
    }

    /* ========================== ROUTE HANDLERS ========================== */

    if (req.method === "GET" && req.url === "/artists") {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify(artists));
    }

    if (req.method === "GET" && req.url.startsWith("/artists/")) {
      const urlSplit = req.url.split("/");
      if (urlSplit.length === 3) {
        const artistId = urlSplit[2];
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(artists[artistId]))
      }
    }

    if (req.method === "POST" && req.url === "/artists") {
      const newArtist = {};
      const newArtistId = getNewArtistId();
      newArtist.artistId = newArtistId;
      newArtist.name = req.body.name;
      artists[newArtistId] = newArtist;
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify(artists[newArtistId]))
    }

    if ((req.method === "PUT" || req.method === "PATCH") && req.url.startsWith('/artists/')) {
      const urlSplit = req.url.split('/');
      if (urlSplit.length === 3) {
        const editArtistId = urlSplit[2];
        if (editArtistId in artists) {
          artists[editArtistId].name = req.body.name
          setResJson(200, res);
          return res.end(JSON.stringify(artists[editArtistId]))
        }
      }
    }

    if (req.method === "DELETE" && req.url.startsWith("/artists/")) {
      const urlSplit = req.url.split('/');
      if (urlSplit.length === 3) {
        const deleteId = urlSplit[2];
        if (deleteId in artists) {
          delete artists[deleteId];
          setResJson(200,res);
          return res.end(JSON.stringify({message: "succesfully deleted"}));
        }
      }
    }

if (req.method === "GET" && req.url.endsWith('/albums') && req.url.startsWith('/artists/')) {
  const urlSplit = req.url.split('/');
  if (urlSplit.length === 4) {
    const idArtist = parseInt(urlSplit[2]);
    const albumsArtist = [];
    for (let idAlbum in albums) {
      if (albums[idAlbum].artistId === idArtist) {
        albumsArtist.push(albums[idAlbum])
      }   
    }
    setResJson(200,res);
    return res.end(JSON.stringify(albumsArtist));
  }
}

if (req.method === "GET" && req.url.startsWith('/albums/')) {
  const urlSplit = req.url.split('/');
  if (urlSplit.length === 3) {
    const idWanted = urlSplit[2];
    const album = albums[idWanted];
    if (album) {
      album.artist = artists[album.artistId];
      album.songs = findSongsAlbumId(parseInt(idWanted));
    }
    setResJson(200, res);
    return res.end(JSON.stringify(album))
  }
}

if (req.method === 'POST' && req.url.startsWith('/artists/') && req.url.endsWith('/albums')) {
  const urlSplit = req.url.split('/');
  if (urlSplit.length === 4) {
    const idArtist = urlSplit[2];
    const newAlbum = {};
    const newAlbumId = getNewAlbumId();
    newAlbum.albumId = newAlbumId;
    newAlbum.name = req.body.name;
    newAlbum.artistId = parseInt(idArtist);
    albums[newAlbumId] = newAlbum;
    setResJson(201,res);
    return res.end(JSON.stringify(newAlbum))
  }
}

if ((req.method === 'PUT' || req.method === 'PATCH') && req.url.startsWith('/albums/')){
  const urlSplit = req.url.split('/');
  if (urlSplit.length === 3) {
    const idAlbum = urlSplit[2];
    albums[idAlbum].name = req.body.name;
    albums[idAlbum].updatedAt = Date.now();
    setResJson(200,res);
    return res.end(JSON.stringify(albums[idAlbum]))
  }
}

if (req.method === 'DELETE' && req.url.startsWith('/albums/')) {
  const urlSplit = req.url.split('/');
  if (urlSplit.length === 3) {
    const idAlbum = urlSplit[2];
    delete albums[idAlbum];
    setResJson(200,res);
    return res.end(JSON.stringify({'message': 'Successfully deleted'}));
  }
}

if (req.method === 'GET' && req.url.startsWith('/artists/') && req.url.endsWith('/songs')) {
  const urlSplit = req.url.split('/');
  if (urlSplit.length === 4) {
    const idArtist = urlSplit[2];
    const wantedSongs = [];
    for (let song of Object.values(songs)) { 
      const idAlbum = song.albumId;
      if (albums[idAlbum].artistId === parseInt(idArtist)) {
        wantedSongs.push(song)
      }
    }
    setResJson(200,res);
    return res.end(JSON.stringify(wantedSongs))
  }
}

if (req.method === 'GET' && req.url.startsWith('/albums') && req.url.endsWith('/songs')) {
  const urlSplit = req.url.split('/');
  if (urlSplit.length === 4) {
    const idAlbum = urlSplit[2];
    const wantedSongs = [];
    for (let song of Object.values(songs)) {
      if (song.albumId === parseInt(idAlbum)) {
        wantedSongs.push(song);
      }
    }
    setResJson(200,res);
    return res.end(JSON.stringify(wantedSongs));
  }
}

if (req.method === 'GET' && req.url.startsWith('/tracknumbers/') && req.url.endsWith('/songs')) {
  const urlSplit = req.url.split('/');
  if (urlSplit.length === 4) {
    const idTrack = urlSplit[2];
    const wantedSongs = [];
    for (let song of Object.values(songs)) {
      if (song.trackNumber === parseInt(idTrack)) {
        wantedSongs.push(song)
      }
    }
    setResJson(200,res);
    return res.end(JSON.stringify(wantedSongs));
  }
}

if (req.method === 'GET' && req.url.startsWith('/songs/')) {
  const urlSplit = req.url.split('/');
  if (urlSplit.length === 3) {
    const idSong = urlSplit[2];
    setResJson(200,res);
    return res.end(JSON.stringify(songs[idSong]));
  }
}

if (req.method === 'POST' && req.url.startsWith('/albums/') && req.url.endsWith('/songs')) {
  const urlSplit = req.url.split('/');
  if (urlSplit.length === 4) {
    const idAlbum = urlSplit[2];
    const newSongId = getNewSongId();
    const newSong = {};
    newSong.name = req.body.name
    newSong.trackNumber = req.body.trackNumber
    newSong.lyrics = req.body.lyrics;
    songs[newSongId] = newSong;
    setResJson(201,res);
    return res.end(JSON.stringify(newSong));
  }
 }

 if ((req.method === 'PATCH' || req.method === 'PUT') && req.url.startsWith('/songs/')) {
  console.log('eh nois');
  const urlSplit = req.url.split('/');
  if (urlSplit.length === 3) {
    const idSong = urlSplit[2];
    if (songs[idSong]) {
      for (let key in req.body) {
        songs[idSong][key] = req.body[key];
      }
    }
    setResJson(200,res);
    return res.end(JSON.stringify(songs[idSong]));
  }
 }

 if (req.method === 'DELETE' && req.url.startsWith('/songs/')) {
  const urlSplit = req.url.split('/');
  if (urlSplit.length === 3) {
    const idSong = urlSplit[2];
    if (songs[idSong]) {
      delete songs[idSong];
    }
    setResJson(200,res);
    return res.end(JSON.stringify({"message": "Successfully Deleted"}))
  }
 }


    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.write("Endpoint not found");
    return res.end();
  });
});

function setResJson(code,res) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json');
}

function findSongsAlbumId(id) {
  const songsInAlbum = []
  for (let idSong in songs) {
    if (songs[idSong].albumId === id) {
      songsInAlbum.push(songs[idSong]);
    }
  }
  return songsInAlbum
}

const port = process.env.port || 5000;

server.listen(port, () => console.log('Server is listening on port', port));