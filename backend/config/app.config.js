import express from 'express';
import helemt from 'helmet';

const app = express();
app.disable('x-powered-by');

app.use(helemt());
app.use(express.json());

export default app;
