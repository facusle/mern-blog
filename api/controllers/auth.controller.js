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
export const google = async (req, res, next) => {
     const { email, name, googlePhotoUrl } = req.body;
     try {
          await User.findOne({
               email,
          }).then((data) => {
               if (data) {
                    const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET_KEY);
                    const { password: passStoreInfinity, ...returnData } = data._doc;
                    res.status(200)
                         .cookie('access_token', token, {
                              httpOnly: true,
                         })
                         .json(returnData);
               } else {
                    const genPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
                    const hashPass = bcryptjs.hashSync(genPassword, 10);
                    var user = {
                         username: name.toLowerCase().split(' ').join(''),
                         email,
                         password: hashPass,
                         profilePicture: googlePhotoUrl,
                    };
                    User.create(user).then((dataCreateUser) => {
                         if (dataCreateUser) {
                              console.log('vàox');
                              console.log('data._doc', dataCreateUser);
                              // res.json({ message: 'Sign fking up  successfully' });
                              const token = jwt.sign({ id: dataCreateUser._id }, process.env.JWT_SECRET_KEY);
                              const { password: passStoreInfinity, ...returnData } = dataCreateUser._doc;
                              res.status(200)
                                   .cookie('access_token', token, {
                                        httpOnly: true,
                                   })
                                   .json(returnData);
                         } else {
                              next(error);
                         }
                    });
               }
          });
     } catch (error) {
          next(error);
     }
};
