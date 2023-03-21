const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {

  if (req.url.startsWith("/static") && req.method === "GET") {
    const urlSplit = req.url.split("/");
    const file = urlSplit.slice(-1)[0];
    const fileExt = file.substring(file.indexOf(".") + 1);
    const fileType = urlSplit[2];
    const filePath = "./assets/" + fileType + "/";
    let contentType;
    if (fileType === "images") contentType = "image/" + fileExt;
    if (fileType === "css") contentType = "text/" + fileExt;
  
    const fileContents = fs.readFileSync(filePath + file);
    
    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    return res.end(fileContents);    
  }
  const fileContents = fs.readFileSync("./index.html");
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(fileContents);
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));