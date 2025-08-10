import express from 'express';
const router = express.Router();
import {
  getForms, 
  createForm
} from '../controllers/form.controller.js';

router.get("/", getForms).post("/", createForm);

export default router;
