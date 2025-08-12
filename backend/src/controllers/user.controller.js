import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const getUsers = asyncHandler(async (req, res) => {

  const users = await User.find({}, {
    name: 1,
    email: 1,
    _id: 1
  });

  if(!users)
    throw new Error("Unable to fetch users. Some error occured!");

  return res.status(200).json({
    status: true,
    users,
    msg: "users loaded successfully."
  })
});

export const createUser = asyncHandler(async (req, res) => {

  const {
    name,
    email,
    password
  } = req.body;

  const user = await User.create({
    name, 
    email,
    password
  });

  if(!user)
    throw new Error("Unable to create user. Some error occured!");

  const userDetailsWithToken = await generateToken(user);

  return res.status(201).json({
    status: true,
    user: userDetailsWithToken,
    msg: "User signed up successfully"
  })
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("email password name _id");

  if(!user)
    throw new Error("Unable to login. User not found.");

  let isCorrectPassword = await user.comparePassword(password);

  if(!isCorrectPassword)
    throw new Error("Unable to login. Invalid password.");

  const userDetailsWithToken = await generateToken(user);

  return res.status(201).json({
    status: true,
    user: userDetailsWithToken,
    msg: "User logged in successfully"
  })

});