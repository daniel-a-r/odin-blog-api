import express from 'express';
import helemt from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import { createWriteStream } from 'node:fs';
import path from 'node:path';

const app = express();
const accessLogStream = createWriteStream(
  path.join(import.meta.dirname, 'access.log'),
  { flags: 'a' },
);

app.use(cors({ origin: ['http://localhost:5174'], credentials: true }));
app.use(helemt());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  process.env.NODE_ENV === 'DEV'
    ? morgan('dev')
    : morgan('combined', { stream: accessLogStream }),
);

export default app;
