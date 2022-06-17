const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('dist'));

const users = ['1', '2'];

app.get('/users', (req, res) => {
    res.json({data: users});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})