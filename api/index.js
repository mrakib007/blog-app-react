const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/register',(req,res)=>{
    const {name,username,password} = req.body;
    res.json({requestData:{name,username,password}})
})
app.listen(5000);