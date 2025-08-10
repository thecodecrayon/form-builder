import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";

export const getUsers = asyncHandler(async (req, res) => {

  const users = await User.find({}, {
    name: 1,
    email: 1,
    _id: 1
  });

  if(!users)
    throw new Error("Unable to fetch users. Some error occured!");

  return res.status(200).json({
    status: "success",
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

  return res.status(201).json({
    status: "success",
    user,
    msg: "user created successfully."
  });
});