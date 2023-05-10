const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express();
app.use(cors());
require('dotenv').config();
app.use(express.json());
const port = process.env.PORT || 5000;

const User = require('./models/User');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3zndhpn.mongodb.net/?retryWrites=true&w=majority`)

app.post('/register', async(req,res)=>{
    const {name,username,password} = req.body;
    try{
        const userDoc = await User.create({name,username,password});
        res.json(userDoc);
    }catch(error){
        res.status(400).json(error);
    }
})
app.listen(port,()=>(console.log('Blog website Database is running.')));
