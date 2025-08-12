import express from 'express';
const router = express.Router();
import {
  getUsers, 
  createUser,
  loginUser
} from '../controllers/user.controller.js';

router.get("/", getUsers).post("/", createUser);
router.post("/login", loginUser);

export default router;
