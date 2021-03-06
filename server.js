const express = require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const fs = require('fs')
const ini = require('ini')
const path = require('path')

const config = ini.parse(fs.readFileSync('./config/data.ini', 'utf-8'))
const app = express();
const uri = config.database.uri
const port = process.env.PORT || 5000

// body-parser middleware
app.use(bodyParser.json());

mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true})
   .then(()=>console.log('mongoose connected'))
   .catch(err=>console.log(err))

app.use('/api/items',require('./routes/api/items.js'))
app.use('/api/users',require('./routes/api/users.js'))
app.use('/api/auth',require('./routes/api/auth.js'))


app.options('/url...',(req, res, next)=>{
   res.header('Access-Control-Allow-Origin', "*");
   res.header('Access-Control-Allow-Methods', 'POST');
   res.header('Access-Control-Allow-Methods', 'GET');
   res.header('Access-Control-Allow-Methods', 'DELETE');
   res.header("Access-Control-Allow-Headers", "accept, content-type");
   return res.sendStatus(200);
});

// Serve static assets in production
if(process.env.NODE_ENV === 'production'){
   app.use(express.static('client/build'))
   app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'));
   })
}

app.listen(port,()=>console.log(`server listening on ${port}`))
