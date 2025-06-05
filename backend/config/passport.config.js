import passport from 'passport';
import passportJwt from 'passport-jwt';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    if (jwt_payload) {
      const { id, username, role } = jwt_payload;
      const user = {
        id,
        username,
        role,
      };
      return done(null, user);
    }
    return done(null, false);
  }),
);

const passportJwtAuth = passport.authenticate('jwt', {
  session: false,
  failWithError: true,
});

export default passportJwtAuth;
