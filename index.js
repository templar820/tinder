import path from 'path';
import express from 'express';
import fetch from "node-fetch"
import cors from 'cors'

const port = process.env.PORT || 8000;

const app = express(); // create express app

app.use(cors());
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen(port, () => {
  console.log('server started on port', port);
});


app.get('/get_text', (req, res) => {
  fetch("https://evilinsult.com/generate_insult.php?lang=ru&type=json").then(response => {
    response.json().then(value => {
      res.send(value)
    })
  })
});