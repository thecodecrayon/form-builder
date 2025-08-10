import dotenv from 'dotenv';
import app from "./app.js";
import { connectDB } from './db/dbConnect.js';
dotenv.config({ path: "./src/.env" });

const PORT = process.env.PORT || 8000;
const DB_CONN_STRING = process.env.DB_CONN_STRING;
const DB_NAME = process.env.DB_NAME;

connectDB({ DB_CONN_STRING, DB_NAME })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.log(`Error - while connecting with DB`, err);
  });