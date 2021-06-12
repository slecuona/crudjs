const express = require('express')
const app = express()

app.use('/crud.js', express.static('crud.js'));
app.get('/', function (req, res) {
  res.redirect('/ajax.html')
})
app.use('/', express.static('demo'));

const PORT = 3001;
app.listen(PORT, () => {
  console.log('Running on port '+PORT);
})