const http = require('http');
const fs = require('fs');

const { Player } = require('./game/class/player');
const { World } = require('./game/class/world');

const worldData = require('./game/data/basic-world-data');

let player;
let world = new World();
world.loadWorld(worldData);

const server = http.createServer((req, res) => {

  /* ============== ASSEMBLE THE REQUEST BODY AS A STRING =============== */
  let reqBody = '';
  req.on('data', (data) => {
    reqBody += data;
  });

  req.on('end', () => { // After the assembly of the request body is finished
    /* ==================== PARSE THE REQUEST BODY ====================== */
    if (reqBody) {
      req.body = reqBody
        .split("&")
        .map((keyValuePair) => keyValuePair.split("="))
        .map(([key, value]) => [key, value.replace(/\+/g, " ")])
        .map(([key, value]) => [key, decodeURIComponent(value)])
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
    }

    /* ======================== ROUTE HANDLERS ========================== */
    // Phase 1: GET /
    if (req.url === "/" && req.method === "GET") {

      const htmlTemplate = fs.readFileSync("./views/new-player.html", "utf-8");
      const htmlBody = htmlTemplate.replace(/#{availableRooms}/, world.availableRoomsToString());
      
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      return res.end(htmlBody);
    }

    // Phase 2: POST /player
    if (req.url === "/player" && req.method === "POST") {
      const {name, roomId} = req.body;
      player = new Player(name, world.rooms[roomId]);

      res.statusCode = 302;
      res.setHeader("Location", "/rooms/" + roomId);

      return res.end();
    }

    if (!player) return redirect("/", res);


    // Phase 3: GET /rooms/:roomId
    if (req.url.startsWith("/rooms/") && (req.method === "GET")) {


      const urlParts = req.url.split("/");
      if (urlParts.length === 3) {
      
        if (player.currentRoom.id !== parseInt(urlParts[2])) return redirect("/rooms/" + player.currentRoom.id, res);
        
        const idRoom = urlParts[2];

        const htmlTemplate = fs.readFileSync("./views/room.html", "utf-8");
        const htmlBody = htmlTemplate.replace(/#{roomName}/g, world.rooms[idRoom].name)
          .replace(/#{inventory}/g, player.inventoryToString())
          .replace(/#{roomItems}/g, world.rooms[idRoom].itemsToString())
          .replace(/#{exits}/g, world.rooms[idRoom].exitsToString());
        
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html")
        return res.end(htmlBody);
        
        
        } 
    }

    // Phase 4: GET /rooms/:roomId/:direction

    if (req.url.startsWith ("/rooms/") && req.url.split("/").length === 4 && req.method === "GET") {
      const urlParts = req.url.split("/");
      const idRoom = urlParts[2];

      if (player.currentRoom.id !== parseInt(idRoom)) return redirect("/rooms/" + player.currentRoom.id, res);

      const idDirection = urlParts[3][0];

      try {
        nextRoomId = player.move(idDirection).id
      } catch (e) {
        return redirect("/rooms/" + player.currentRoom.id, res);
      }
      return redirect("/rooms/" + nextRoomId, res);
    }

    // Phase 5: POST /items/:itemId/:action

    if (req.method === "POST" && req.url.startsWith("/items/")) {
      const urlParts = req.url.split("/");
      if (urlParts.length !== 4) return redirect("/rooms/" + player.currentRoom.id, res);
      const itemId = parseInt(urlParts[2]);
      const action = urlParts[3];
      try {
      switch (action) {
        case 'take':
          player.takeItem(itemId);
          break;
        case 'eat':
          player.eatItem(itemId);
          break;
        case 'drop':
          player.dropItem(itemId);
      }
    } catch (e) {
      const htmlTemplate = fs.readFileSync("./views/error.html", "utf-8");
      const htmlBody = htmlTemplate.replace(/#{errorMessage}/g, e.message)
        .replace(/#{roomId}/g, player.currentRoom.id);

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      return res.end(htmlBody);
    }
      return redirect("/rooms/" + player.currentRoom.id, res);

    }


    // Phase 6: Redirect if no matching route handlers
    return redirect("/rooms/" + player.currentRoom.id, res);

  })
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));

function redirect(location, res) {
  res.statusCode = 302;
  res.setHeader("Location", location);
  return res.end()
}