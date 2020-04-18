const express = require('express')

const app = express()

const Item = require('../../models/Item')

// @route GET application
// @desc GET all items
// @access public
app.get('/',(req,res)=>{
   Item.find()
   .sort({date:-1}) 
   .then(items=>res.json(items))
})

// @route POST application
// @desc CREATE all items
// @access public
app.post('/',(req,res)=>{
   const newItem = new Item({
      name:req.body.name
   });
   newItem.save().then(items=>res.json(items));
})

// @route DELETE application
// @desc delete one items
// @access public
app.delete('/:id',(req,res)=>{
   Item.findById(req.params.id)
   .then(item=>item.remove().then(()=>res.json({msg:`items deleted: ${item.name}`,sucess:true})))
   .catch(err=>res.status(404).json({sucess:false}))
})

module.exports = app