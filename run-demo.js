const express = require('express')
const app = express()

app.use('/crud.js', express.static('crud.js'));
app.get('/', function (req, res) {
  res.redirect('/index.html')
})
app.use('/', express.static('demo'));


app.listen(3001)