import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '../prisma/client.js';
import { ExpressValidator, validationResult } from 'express-validator';

const ACCESS_TOKEN_EXPIRES_IN = '30m';

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
  const opts = { expiresIn: ACCESS_TOKEN_EXPIRES_IN };
  const token = jwt.sign(payload, process.env.JWT_SECRET, opts);
  res.json({
    token,
  });
};

const signUpPost = [...validateSignUp, checkSignUpValidationErrors, createUser];

const loginPost = (req, res) => {
  const { username, password } = req.body;
  const payload = { username };
  const opts = { expiresIn: ACCESS_TOKEN_EXPIRES_IN };
  const token = jwt.sign(payload, process.env.JWT_SECRET, opts);
  res.json({
    token,
  });
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
