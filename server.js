const express = require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const fs = require('fs')
const ini = require('ini')

const config = ini.parse(fs.readFileSync('./config/data.ini', 'utf-8'))
const app = express();
const uri = config.database.uri
const port = process.env.PORT || 5000

// body-parser middleware
app.use(bodyParser.json());

mongoose.connect(uri)
   .then(()=>console.log('mongoose connected'))
   .catch(err=>console.log(err))

app.use('/api/items',require('./routes/api/items.js'))

app.listen(port,()=>console.log(`server listening on ${port}`))
