const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./connectdb');
const pass = require('./password');
const jwtToken = require('./token');
app.use(cors());
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    phone: Number,
    plan: String

});

const User = mongoose.model('User',userSchema);

//login api
app.post('/login',async (req,res) =>{
    try {
        
        const document = await User.findOne({ email : req.body.email });
        if(!document){
             return res.status(400).json({ message: 'invalid details' });

        }
        const passwordCheck = await pass.verify(req.body.password, document.password);
        if(!passwordCheck){
            return res.status(400).json({ message: 'invalid details' });

       }
       const token = await jwtToken.generate({ id: document._id });
        res.json({token,id: document._id });  
    } catch (error) {       
        res.status(500).json({ message: 'error' });
    }
 })

 //create/insert 
app.post('/user',async (req,res) =>{
   try {
       const hashPassword = await pass.hash(req.body.password);
       req.body.password = hashPassword;       
       const data = await User.create(req.body);
       console.log(data);  
       res.json(data);  
   } catch (error) {       
       res.status(500).json({message: 'error'});
   }
})

//data retrieve
app.get('/user/:id',async (req,res) =>{
    try {
        const data = await User.findById(req.params.id)
        res.json(data);  
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'error'})
    }
 })


//data Update
app.post('/user/:id',async (req,res) =>{
    try {

        const data = await User.findByIdAndUpdate(req.params.id,{plan: req.body.plan}, {new: true},);
        console.log(data);  
        res.json(data);  
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error})
    }
 })

//deletion
 app.delete('/user/:id',async (req,res) =>{
    try {
        const data = await User.findByIdAndDelete(req.params.id);
        console.log('record deleted');  
        res.json(data);  
    } catch (error) {
        res.status(500).json({message: 'error'})
    }
 })

app.listen(5000,() => {
    console.log("server listening at port 5000");
})
