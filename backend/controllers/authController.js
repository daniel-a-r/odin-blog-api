import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '../prisma/client.js';
import { ExpressValidator, validationResult } from 'express-validator';

const ACCESS_TOKEN_EXPIRES_IN = '30 minutes';
const REFRESH_TOKEN_EXPIRES_IN = '7 days';
const COOKIE_OPTS = {
  maxAge: 1000 * 60 * 60 * 24 * 7, // 1 second * 60 seconds * 60 minutes * 24 hours * 7 days
  secure: true,
  signed: true,
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

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

const checkSignUpValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

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

const loginPost = async (req, res) => {
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

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);

    res.cookie('refreshToken', refreshToken, COOKIE_OPTS).json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'invalid username or password' });
  }
};

const refreshGet = (req, res) => {
  return 0;
};

const protectedGet = (req, res) => {
  return res.json({ message: 'authenticated!', user: req.user });
};

export default {
  signUpPost,
  loginPost,
  protectedGet,
};
