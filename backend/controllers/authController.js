const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 20 });
};

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //All the Checks
    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide all the credentials.");
    }
    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must be more than 5 characters.");
    }
    if (password.length > 20) {
      res.status(400);
      throw new Error("Password must be less than 20 characters.");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("This email is already taken.");
    }

    //Encrypting the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //Creating a user in db
    const user = await User.create({
      email,
      password: hashedPassword,
    });
    //Generating Token For User
    const token = generateToken(user._id);
    if (user) {
      const { email } = user;
      res.status(201).json({ email, token });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide all the credentials.");
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("User not Found!");
    }
    const truePassword = await bcrypt.compare(password, user.password);
    //Generating Token For User
    const token = generateToken(user._id);
   
    if (user && truePassword) {
      const { email } = user;
      res.status(200).json({ email, token });
    } else {
      res.status(400);
      throw new Error("Invalid Email or Password.");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const tokenCheck = (req, res)=>{
  const {token} = req.body;
  try {
    const verified = jwt.verify(token,process.env.JWT_SECRET);
  if (verified) {
    res.status(200).json({authentic : true})
  }  
  } catch (error) {
    res.json({error:error.message}); 
  }
  
}

const logout = async (req, res)=>{
  res.send("Logout");
}

const getMessage = async (req, res)=>{
  res.json({message:"Hello World"});
}

module.exports = {
  createUser,
  loginUser,
  tokenCheck,
  logout,
  getMessage
};
