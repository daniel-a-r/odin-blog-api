import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '../prisma/client.js';
import { ExpressValidator, validationResult } from 'express-validator';

const ACCESS_TOKEN_EXPIRES_IN = 60 * 5; // 60 seconds * 5 minutes
const REFRESH_TOKEN_EXPIRES_IN = 60 * 60 * 24 * 7; // 60 seconds * 60 minutes * 24 hours * 7 days
const COOKIE_OPTS = {
  maxAge: 1000 * 60 * 60 * 24 * 7, // 1 second * 60 seconds * 60 minutes * 24 hours * 7 days
  httpOnly: true,
  secure: true,
  signed: true,
};

/**
 * Create a new signed access token where the payload is an object as the following:
 * ```json
 * {
 *    userID,
 *    username,
 *    role
 * }
 * ```
 * @param {object} payload
 * @returns {string} json web token string
 */
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

/**
 * Create a new signed refresh token where the payload is an object as the following:
 * ```json
 * {
 *    userID,
 *    username,
 *    role
 * }
 * ```
 * @param {object} payload
 * @returns {string} json web token string
 */
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
};

const { body } = new ExpressValidator({
  isUsernameNotInUse: async (value) => {
    const existingUser = await prisma.user.findUnique({
      where: {
        username: value,
      },
    });
    if (existingUser) {
      throw new Error('Username already taken');
    }
  },
  passwordsMatch: (value, { req }) => {
    if (req.body.password !== value) {
      throw new Error('Passwords do not match');
    }
    return true;
  },
});

const validateSignUp = [
  body('username')
    .trim()
    .toLowerCase()
    .isAlphanumeric()
    .withMessage('Username must only contain letters and numbers.')
    .isUsernameNotInUse(),
  body('confirmPassword').passwordsMatch(),
];

/**
 * Checks if any errors occured when validating login.
 * Returns if there are errors,
 * moves onto next middleware function if not
 * @param {Request} req Express request
 * @param {Response} res Express response
 * @param next Express next function
 * @returns {void} void if there are errors
 */
const checkSignUpValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * Creates a new Reader user
 * @param {Request} req Express request
 * @param {Response} res Express response
 */
const createUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
    },
  });

  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  res.cookie('refreshToken', refreshToken, COOKIE_OPTS).json({ accessToken });
};

const signUpPost = [...validateSignUp, checkSignUpValidationErrors, createUser];

/**
 * Finds user with given username/password and moves onto next middleware function.
 * Sends a 400 status code if user is not found.
 * @param {Request} req Express request
 * @param {Response} res Express response
 * @param {*} next Express next function
 */
const findUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        username,
      },
    });

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error('invalid password');
    }

    req.payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'invalid username or password' });
  }
};

/**
 * If attempted login is from Author page, validate user role
 * @param {Request} req Express request
 * @param {Response} res Express response
 * @param {*} next Express next function
 */
const validateRole = (req, res, next) => {
  try {
    if (req.body.role === 'AUTHOR' && req.payload.role === 'READER') {
      throw new Error('Incorrect role');
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: 'Incorrect permission' });
  }
};

/**
 * Send login response. Set cookie with refresh token and send json with access token.
 * @param {Request} req Express request
 * @param {Response} res Express response
 */
const loginRes = (req, res) => {
  const accessToken = createAccessToken(req.payload);
  const refreshToken = createRefreshToken(req.payload);
  res.cookie('refreshToken', refreshToken, COOKIE_OPTS).json({ accessToken });
};

const loginPost = [findUser, validateRole, loginRes];

/**
 * Get new access token with a valid refresh token
 * @param {Request} req Express request
 * @param {Response} res Express response
 */
const refreshGet = (req, res) => {
  const { refreshToken } = req.signedCookies;
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const payload = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
    };
    const accessToken = createAccessToken(payload);
    console.log(payload);
    res.json({ accessToken });
  } catch (ignoreError) {
    res.status(401).json({ message: 'login required' });
  }
};

export default { signUpPost, loginPost, refreshGet };
