const mongoose = require('mongoose');
const {Schema,model} = mongoose;
const UserSchema = new mongoose.Schema({
    name: {type: String,required: true},
    username: {type: String,required: true,min: 4,unique: true,required:true},
    password: {type: String,require: true},
});

const UserModel = model('User',UserSchema);
module.exports = UserModel;


