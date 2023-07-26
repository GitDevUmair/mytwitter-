const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Tweet = require("../models/Tweet");
const fetchuser = require('../middleware/fetchuser')
// ROUTE 1 get all relevant tweets for news feed using GET  http://localhost:5000/api/newsfeed/getnewsfeed
router.get('/getnewsfeed',fetchuser,async(req,res)=>{
    let id = req.user.id;
    try {
    let user = await User.findById(id)
    if(!user){
        return res.status(404).json({error:"User not found"})
    }
    let listOfFollowees = user.following;
    let tweets = await Tweet.find({createdby : {$in : listOfFollowees}}).sort({ createdAt: -1 });
     // Sort by createdAt field in descending order (latest first)
    res.status(200).json({tweets})
    
} catch (error) {
console.error(error)
res.status(500).send("Internal Server Error")        
}
})

module.exports=router