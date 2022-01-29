const path = require('path');
const express = require('express');

const port = process.env.PORT || 8000;

const app = express(); // create express app

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// start express server on port 5000
app.listen(port, () => {
  console.log('server started on port', port);
});
