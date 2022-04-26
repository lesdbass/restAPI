const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv')
const routes=express.Router()
const User=require('../models/User');
const { Router } = require('express');


dotenv.config({path: __dirname + '/.env'})


app.use(express.json())
//app.use(express.urlencoded())
app.use('/api',routes)
//mongoose connect
//console.log(process.env.ATLAS_URI)
mongoose.connect(process.env.ATLAS_URI,(err) => {
    (err) ? console.error(err) : console.log("Connected")
})



 routes.post('/post', async (req,res) => {
    console.log(JSON.stringify(req.body.name))
	//res.send('Hello World!')
    const u = new User({
        name : req.body['name'],
        age : req.body.age
    })
    
    await u.save((err,data)=>{
        (err) ? res.status(500).json({message : err.message}) : res.status(200).json(data)
    })
})

routes.get('/get', (req,res)=>{
    User.find((err,data) => {
        (err) ? res.status(500).json({massage : err.message}) : res.status(200).json(data)
    })
})

routes.put('/put', (req,res) => {
    console.log(req.query.id)
    


     User.findByIdAndUpdate(req.query.id , {$set:{age : 19}}, (err,data) => {
        (err) ? res.status(500).json({message : err.message}) : res.status(200).json(data)
    })})


routes.delete('/delete', async (req,res) => {
    try {
        const u = await User.findByIdAndDelete(req.query.id)
        res.status(200).json(u)
    }
    catch
    {
        res.status(500).json({message : "Erreur serveur"})
    }
})



app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})