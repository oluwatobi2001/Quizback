const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const bcrypt = require("bcrypt");
const User = require("../model/users.model")

const createUser = async (userInfo) => {
    try {
      // Check if the email already exists in the database
      const ifEmailExists = await User.findOne({ email: userInfo.email } );
      
      if (ifEmailExists) {
        throw new ApiError('Email has already been registered');
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

    return newUser; // Return the created user object
  } catch (error) {
    // Handle errors such as validation or uniqueness constraint
    throw error;
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




module.exports = {
    createUser,
   
  FetchUser
    
  };
  