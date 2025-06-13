import app from './config/app.config.js';
import readerAuthRouter from './routes/authReaderRouter.js';
import readerPostRouter from './routes/postReaderRouter.js';
import authorPostRouter from './routes/postAuthorRouter.js';

const PORT = process.env.PORT || 3000;

app.use('/reader/auth', readerAuthRouter);
app.use('/reader/post', readerPostRouter);
app.use('/author/post', authorPostRouter);

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
