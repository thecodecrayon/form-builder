import express from 'express';
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

import {
  getForms, 
  createForm,
  getFormById
} from '../controllers/form.controller.js';

router.get("/", checkAuth, getForms).post("/", checkAuth, createForm);
router.get("/:formId", checkAuth, getFormById);

export default router;
