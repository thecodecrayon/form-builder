import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// IMPORTING AND USING ROUTES;
import routes from "./routes/index.js";
app.use("/", routes);

export default app;