import express from 'express';
import { register, login } from "../controllers/userController";
import { check } from 'express-validator';

const router = express.Router();

router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').isLength({ min: 6 })
  ],
  register
);

router.post(
  '/login',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').isLength({ min: 6 })
  ],
  login
);

export default router;
