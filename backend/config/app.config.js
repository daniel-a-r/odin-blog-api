import express from 'express';
import helemt from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

app.use(helemt());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan('dev'));

export default app;
