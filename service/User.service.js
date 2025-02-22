const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const bcrypt = require("bcrypt");
const User = require("../model/users.model")

const createUser = async (req, res , next) => {
  const userInfo = req.body;
    try {
      // Check if the email already exists in the database
      const ifEmailExists = await User.findOne({ email: userInfo.email } );
      console.log(ifEmailExists)
      
      if (ifEmailExists) {
       return res.status(400).json({msg: 'Email has already been registered'});
      }
    
    // Hash the user's password before saving to the database
    const saltRounds = 10; // Number of salt rounds for hashing
    const hashedPassword = await bcrypt.hash(userInfo.password, saltRounds);

    // Update the userInfo object with the hashed password
    const newUserInfo = {
      ...userInfo,
      password: hashedPassword, // Store the hashed password
    };

    // Create the new user
    const newUser = await User.create(newUserInfo);
    if(newUser !== null) {
 return  res.status(200).json(newUser) 
    } else {
      return res.status(400).json({msg: "user creation unsuccessful"})
    }

   // Return the created user object
  } catch (error) {
    // Handle errors such as validation or uniqueness constraint
  return res.status(500).json({msg: "here is the error" , error})
  }

  };
  
const FetchUser = async (userId) => {
  let userDets;

  if (userId) {
    // Fetch a single user by ID if userId is provided
    userDets = await User.findOne({ where: { id: userId } });
    
    // Check if the user exists
    if (!userDets) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
  } else {
    // Fetch all users if no userId is provided
    userDets = await User.findAll();
    
    // Check if any users were found
    if (userDets.length === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No users found');
    }
  }

  console.log(userDets); // Log the user data
  return userDets; // Return the fetched user(s)
};

const refreshUser = async(req, res) => {
  try {
    console.log(req.isAuthenticated())
if (req.isAuthenticated()) {
  res.status(200).json({user : req.user})


  } 
}catch(err) {
  console.error(err)
    res.status(400).json(err)
  }
  


}



module.exports = {
    createUser, refreshUser,
   
  FetchUser
    
  };
  