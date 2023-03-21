const http = require('http');
const fs = require("fs");

let dogs = [
  {
    dogId: 1,
    name: 'Fido',
    age: 2
  },
  {
    dogId: 2,
    name: 'Fluffy',
    age: 10
  }
];

let nextDogId = 3;

function getNewDogId() {
  const newDogId = nextDogId;
  nextDogId++;
  return newDogId;
}


function getContentType(fileName) {
  const ext = fileName.split(".")[1];
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "css":
      return "text/css";
    default:
      return "text/plain";
  }
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  if (req.method === "GET" && req.url.startsWith('/assets')) {
    const assetPath = req.url.split("/assets")[1];
    try {
      const resBody = fs.readFileSync("./assets" + assetPath);
      res.statusCode = 200;
      res.setHeader("Content-Type", getContentType(assetPath));
      res.write(resBody);
      return res.end();
    } catch {
      console.error("Cannot find asset", assetPath, "in assets folder");
    }
  }

  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  // When the request is finished processing the entire body
  req.on("end", () => {
    // Parsing the body of the request
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
      console.log(req.body);
    }

    // route handlers
    // GET /
    if (req.method === 'GET' && req.url === '/') {
      const htmlPage = fs.readFileSync("./views/index.html", 'utf-8');
      const resBody = htmlPage;
      
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.write(resBody);
      return res.end();
    }

    // Phase 1: GET /dogs
    if (req.method === 'GET' && req.url === '/dogs') {
      const htmlTemp = fs.readFileSync('./views/dogs.html', 'utf-8')
      let dogsString = '';
      for (let dog of dogs) {
        dogsString += "<li>" + dog.name + "</li>";
      }
      const htmlPage = htmlTemp.replace(/#{dogsList}/g, dogsString);
      
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.write(htmlPage);
      return res.end();
    }

    // Phase 2: GET /dogs/new
    if (req.method === 'GET' && req.url === '/dogs/new') {
      const htmlPage = fs.readFileSync('./views/create-dog.html');
      
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      return res.end(htmlPage)

    }
    
    // Phase 3: GET /dogs/:dogId
    if (req.method === 'GET' && req.url.startsWith('/dogs/')) {
      const urlParts = req.url.split('/');
      if (urlParts.length === 3) {
        const dogId = urlParts[2];
        const dog = dogs.find(dog => dog.dogId == dogId);
        if (dog) {
          const htmlTemplate = fs.readFileSync('./views/dog-details.html', 'utf-8');
          const htmlPage = htmlTemplate
              .replace(/#{name}/g, dog.name)
              .replace(/#{age}/g, dog.age);
          
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/html");

          return res.end(htmlPage);
        }
      }
    }

    // Phase 4: POST /dogs
    if (req.method === 'POST' && req.url === '/dogs') {
      const newDog = req.body;
      newDog.dogId = getNewDogId();
      dogs.push(newDog);
      console.log(dogs);

      res.statusCode = 302;
      res.setHeader("Location", "/dogs/" + newDog.dogId);
      return res.end();

    }

    // Phase 5: GET /dogs/:dogId/edit
    if (req.method === 'GET' && req.url.startsWith('/dogs/')) {
      const urlParts = req.url.split('/');
      if (urlParts.length === 4 && urlParts[3] === 'edit') {
        const dogId = urlParts[2];
        const dog = dogs.find(dog => dog.dogId == dogId);
        const htmlTemplate = fs.readFileSync("./views/edit-dog.html", "utf-8");
        const htmlBody = htmlTemplate.replace(/#{dogId}/g, dogId)
                            .replace(/#{name}/g, dog.name)
                            .replace(/#{age}/g, dog.age);
        
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        return res.end(htmlBody);                    
      }
    }

    // Phase 6: POST /dogs/:dogId
    if (req.method === 'POST' && req.url.startsWith('/dogs/')) {
      const urlParts = req.url.split('/');
      if (urlParts.length === 3) {
        const dogId = urlParts[2];
        const dog = dogs.find(dog => dog.dogId == dogId);
        dog.name = req.body.name;
        dog.age = req.body.age;

        res.statusCode = 302;
        res.setHeader("Location", "/dogs/" + dogId);
        return res.end();
      }
    }

    // No matching endpoint
    const htmlPage = fs.readFileSync("./views/error.html", 'utf-8');
    const urlParts = req.url.split('/');
    let msg;
    if (/\d+/.test(urlParts[2])) {
      msg = "Dog not found"} else {
        msg = "Page Not Found"
      }

    const resBody = htmlPage
      .replace(/#{message}/g, msg);
    
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.write(resBody);
    return res.end();
  });
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));