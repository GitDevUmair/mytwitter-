const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "Umairisagoodb$oy";
const fetchuser = require("../middleware/fetchuser");
// ROUTE 1: Create a User using: POST "http://localhost:5000/api/auth/createuser". No login required
router.post(
  "/createuser",
  [body("email", "Enter a valid email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        username: req.body.username,
        password: secPass,
        email: req.body.email,
        fullname: req.body.fullname,
        contact: req.body.contact,
        profileimage: req.body.profileimage,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      var authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
// ROUTE 2: Authenticate a User using: POST "http://localhost:5000/api/auth/login". No login required
router.post("/login", async (req, res) => {
  let success = false;
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({
        success,
        error: "Please try to login with correct credentials",
      });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE 3: Get loggedin User Details using: POST "http://localhost:5000/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let id = req.user.id;
    const user = await User.findById(id).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE 4: Get tweet poster  Details using: Get "http://localhost:5000/api/auth/getposterdetail". Login required
router.post('/getposterdetail',async(req,res)=>{
const id = req.body.id
console.log(id)
const user = await User.findById(id)
if(!user){
  return res.status(404).json({error:"User not found"})
}
res.json(user)
})
module.exports = router;
