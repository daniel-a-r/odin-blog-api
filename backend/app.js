import express from 'express';
import passport from 'passport';
import passportJwt from 'passport-jwt';
import prisma from './prisma/client.js';
import helemt from 'helmet';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const app = express();
app.disable('x-powered-by');

app.use(helemt());
app.use(express.urlencoded({ extended: false }));

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
  secretOrKey: 'secret',
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log(jwt_payload);
    done(null, false);
  }),
);

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  res.json({
    message: 'login route',
    body: {
      username,
      password,
    },
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
