const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('GET / This is the root URL');
});

app.use((req, res, next) => {
  const err = new Error("Sorry, the requested resource couldn't be found");
  err.statusCode = 404;
  next(err);
})

app.use((err,req,res,next) => {
  console.error(err);
  console.log('no error');
  res.status(err.statusCode || 500);
  const response = {
    message: `${err.message}`,
    statusCode: err.statusCode
  }
  res.json(response);
})


const port = 8000;
app.listen(port, () => console.log('Server is listening on port', port));