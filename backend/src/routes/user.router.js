import express from 'express';
const router = express.Router();
import {
  getUsers, 
  createUser
} from '../controllers/user.controller.js';

router.get("/", getUsers).post("/", createUser);

export default router;
