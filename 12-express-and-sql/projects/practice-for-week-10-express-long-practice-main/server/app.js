require("express-async-errors");

const express = require('express');
const dogs = require('./routes/dogs');


const app = express();

const errorHandler = (err, req, res, next) => {
  console.error(err);
  const env = process.env.NODE_ENV;
  const errJson = {
    msg: err.message || "Something went wrong",
    statusCode: err.statusCode || 500,
    }
  if (env != "production") {
    errJson.stack = err.stack
  }
  res.status(err.statusCode || 500).json(errJson);
};

const logger = (req, res, next) => {
  res.on('finish', ()=> console.log(res.statusCode));
  console.log(req.method, req.path);
  next();
}

const notFound = (req, res) => {
  const err = new Error ("The requested resource couldn't be found.")
  err.statusCode = 404;
  throw err;
}
 
app.use(express.json());

app.use('/dogs', dogs);

// For testing purposes, GET /
app.get('/', (req, res) => {
  res.json("Express server running. No content provided at root level. Please use another route.");
});

app.use(logger);

app.use("/static", express.static("assets"));



// For testing express.json middleware
app.post('/test-json', (req, res, next) => {
  // send the body as JSON with a Content-Type header of "application/json"
  // finishes the response, res.end()
  res.json(req.body);
  next();
});

// For testing express-async-errors
app.get('/test-error', async (req, res) => {
  throw new Error("Hello New World!")
});


app.use(notFound);

app.use(errorHandler);

const port = 3000;
app.listen(port, () => console.log('Server is listening on port', port)); 