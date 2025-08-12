import express from 'express';
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

import {
  getUsers, 
  createUser,
  loginUser
} from '../controllers/user.controller.js';

router.get("/", checkAuth, getUsers).post("/", createUser);
router.post("/login", loginUser);

export default router;
