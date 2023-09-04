const express = require('express');
const app = express();

app.get('/goodbye/until/:time', (req, res) => {
    res.send(`Have a nice day. See you ${req.params.time}.`);
});

app.get('/goodbye/forever', (req, res) => {
    res.send("So long. Farewell. Have a great life!");
});

app.get(['/goodbye', '/goodbye/*'], (req, res) => {
    res.send("Goodbye, my friend!");
});

app.get('/hello', (req, res) => {
    res.send("Hello, my friend!");
});

app.get('/', (req, res) => {
    res.send("Server is alive");
});





const port = 8080;
app.listen(port, () => console.log('Server is listening on port', port));