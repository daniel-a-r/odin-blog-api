import app from './config/app.config.js';
import passportJwtAuth from './config/passport.config.js';
import authRouter from './routes/authRouter.js';
import authorRouter from './routes/authorRouter.js';
import readerRouter from './routes/readerRouter.js';

const PORT = process.env.PORT || 3000;

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/author/post', passportJwtAuth, authorRouter);
app.use('/api/v1/reader/post', passportJwtAuth, readerRouter);

app.use((_req, res) => {
  res.status(404).json({
    message: 'Resource not found',
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  const statusCode = err.status || 500;
  res.status(statusCode).json(err);
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
