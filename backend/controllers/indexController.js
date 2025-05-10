import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '../prisma/client.js';

const signUpPost = (req, res) => {
  res.json({
    message: 'signed up!',
  });
};

const loginPost = (req, res) => {
  const { username, password } = req.body;
  const payload = { username };
  const opts = { expiresIn: '30m' };
  const token = jwt.sign(payload, process.env.JWT_SECRET, opts);
  res.json({
    token,
  });
};

const protectedGet = (req, res) => {
  return res.json({ message: 'authenticated!', user: req.user });
};

export default {
  signUpPost,
  loginPost,
  protectedGet,
};
