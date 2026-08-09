import express from 'express';
import helemt from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(cors({ origin: ['http://localhost:5174'] }));
app.use(helemt());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(process.env.NODE_ENV === 'DEV' ? morgan('dev') : morgan('combined'));

export default app;
