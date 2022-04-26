const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name : {
        type: String,
        require: true
    },
    age: {
        type:Number,
        min :1,
        max : 100,
        require : true
    }
})
module.exports = mongoose.model("Users" , userSchema)