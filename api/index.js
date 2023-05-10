const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { default: mongoose } = require('mongoose');
const app = express();
app.use(cors());
require('dotenv').config();
app.use(express.json());
const port = process.env.PORT || 5000;

const User = require('./models/User');

const salt = bcrypt.genSaltSync(10);

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3zndhpn.mongodb.net/?retryWrites=true&w=majority`)

app.post('/register', async(req,res)=>{
    const {name,username,password} = req.body;
    const oldUserName = await User.findOne({username});
    if(!oldUserName){
        try{
        const userDoc = await User.create({
            name,
            username,
            password:bcrypt.hashSync(password,salt)
        });
        res.status(200).json(userDoc);
    }catch(error){
        res.status(400).json(console.log(error));
    }
}else{
    res.status(400).json({message: 'User Name Exists'})
}
})

app.post('/login',async (req,res)=>{
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk){
        //user logged in
    }else{
        res.status(400).json('Wrong Credentials')
    }
})
app.listen(port,()=>(console.log('Blog website Database is running.')));
