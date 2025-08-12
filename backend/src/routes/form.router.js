import express from 'express';
const router = express.Router();
import {
  getForms, 
  createForm,
  getFormById
} from '../controllers/form.controller.js';

router.get("/", getForms).post("/", createForm);
router.get("/:formId", getFormById);

export default router;
