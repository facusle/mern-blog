import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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

export const signin = async (req, res, next) => {
     const { email, password } = req.body;

     if (!email || !password || email === '' || password === '') {
          return next(errorHandler(400, 'Hold on, nhập hết đi đã'));
     }
     User.findOne({
          email,
     }).then((data) => {
          if (!data) {
               return next(errorHandler(404, 'Email Bịp!'));
          } else {
               const comparePass = bcryptjs.compareSync(password, data.password);
               if (!comparePass) {
                    next(errorHandler(400, 'Có cái pass thôi cũng k nhớ'));
               } else {
                    const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET_KEY);
                    const { password: passStoreInfinity, ...returnData } = data._doc;
                    res.status(200)
                         .cookie('access_token', token, {
                              httpOnly: true,
                         })
                         .json(returnData);
               }
          }
     });
};
