import express from "express";
import userRouter from "./user.router.js"; 
import formRouter from "./form.router.js";

const router = express.Router();

router.use("/api/v1/users", userRouter); 
router.use("/api/v1/forms", formRouter);

export default router; 
