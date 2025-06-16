import app from './config/app.config.js';
import passportJwtAuth from './config/passport.config.js';
import authRouter from './routes/authRouter.js';
import readerPostRouter from './routes/reader/postReaderRouter.js';
import authorPostRouter from './routes/author/postAuthorRouter.js';
import readerCommentRouter from './routes/reader/commentReaderRouter.js';

const PORT = process.env.PORT || 3000;

app.use('/auth', authRouter);
app.use('/reader/post', passportJwtAuth, readerPostRouter);
app.use('/author/post', passportJwtAuth, authorPostRouter);
app.use('/reader/post', passportJwtAuth, readerCommentRouter);

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
