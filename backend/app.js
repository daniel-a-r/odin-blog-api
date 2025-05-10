import prisma from './prisma/client.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import app from './config/app.config.js';
import passportJwtAuth from './config/passport.config.js';

app.post('/sign-up', (req, res) => {
  console.log(req.body);
  res.json({
    message: 'signed up!',
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const payload = { username };
  const opts = { expiresIn: '30m' };
  const token = jwt.sign(payload, process.env.JWT_SECRET, opts);
  res.json({
    token,
  });
});

app.get('/protected', passportJwtAuth, (req, res) => {
  return res.json({ message: 'authenticated!', user: req.user });
});

app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.status || 500;
  res.status(statusCode).json(err);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
