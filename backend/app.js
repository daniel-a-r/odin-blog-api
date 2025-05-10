import app from './config/app.config.js';
import indexRouter from './routes/indexRouter.js';

const PORT = process.env.PORT || 3000;

app.use('/', indexRouter);
app.use((req, res) => {
  res.status(404).json({
    message: 'Resource not found',
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.status || 500;
  res.status(statusCode).json(err);
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
