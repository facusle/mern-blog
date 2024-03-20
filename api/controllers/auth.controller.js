import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
     const { email, username, password } = req.body;

     if (!email || !username || !password || email === '' || username === '' || password === '') {
          return next(errorHandler(400, 'All fields are required'));
     }
     const hashPass = bcryptjs.hashSync(password, 10);

     const newUser = new User({
          username,
          password: hashPass,
          email,
     });

     try {
          await newUser.save();
          res.json({ message: 'Sign fking up  successfully' });
     } catch (error) {
          next(error);
     }
};
