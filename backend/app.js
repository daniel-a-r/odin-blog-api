import express from 'express';
import passport from 'passport';
import passportJwt from 'passport-jwt';
import prisma from './prisma/client.js';
import helemt from 'helmet';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const app = express();
app.disable('x-powered-by');

app.use(helemt());
app.use(express.urlencoded({ extended: false }));

// const opts = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
//   secretOrKey: process.env.JWT_SECRET,
// };

// passport.use(
//   new JwtStrategy(opts, async (jwt_payload, done) => {
//     console.log(jwt_payload);
//     done(null, false);
//   }),
// );

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const payload = { username };
  const opts = { expiresIn: '30m' };
  const token = jwt.sign(payload, process.env.JWT_SECRET, opts);
  res.json({
    token,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
