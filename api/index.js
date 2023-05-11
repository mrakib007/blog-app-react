const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');
const multer = require('multer');
require('dotenv').config();
const uploadMiddleware = multer({dest:'uploads/'});
const fs = require('fs');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;

const app = express();
const User = require('./models/User');
const Post = require('./models/Post');
const salt = bcrypt.genSaltSync(10);
const secret = 'asdjfsadgfhgadfadfjhasdjk';
// const secret = process.env.SECRET_KEY;

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use('/uploads',express.static(__dirname + '/uploads'));

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
        jwt.sign({username,id:userDoc._id},secret,{},(error,token)=>{
            if(error) throw error;
            res.cookie('token',token).json({
                id: userDoc._id,
                username,
            })
        })
    }else{
        res.status(400).json('Wrong Credentials')
    }
})

app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,secret,{},(error,info)=>{
        if(error) throw error;
        res.json(info);
    });
});

app.post('/post',uploadMiddleware.single('file'), async (req,res)=>{
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path,newPath);

    const {token} = req.cookies;
    jwt.verify(token,secret,{},async (error,info)=>{
        if(error) throw error;
        const {title,summary,content} = req.body;
    const postDoc = await Post.create({
        title,
        summary,
        content,
        cover:newPath,
        author: info.id,
    })
    res.json(postDoc);
    });
})

app.get('/post',async (req,res) => {
    const posts = await Post.find()
    .populate('author',['username'])
    .sort({createdAt: - 1})
    .limit(20);
    res.json(posts);
})

app.get('/post/:id',async(req,res)=>{
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author',['username']);
    res.json(postDoc);
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok logged out');
})
app.listen(port,()=>(console.log('Blog website Database is running')));
