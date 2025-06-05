import express from 'express';
import helemt from 'helmet';
import cookieParser from 'cookie-parser';

const app = express();
app.disable('x-powered-by');

app.use(helemt());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

export default app;
