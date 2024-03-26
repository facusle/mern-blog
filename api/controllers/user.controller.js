import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
     res.json({ message: 'api testing' });
};

export const updateUser = async (req, res, next) => {
     console.log('req.user', req.user);
     if (req.user?.id !== req.params.userId) {
          return next(errorHandler(403, 'You do not have permission to update this user'));
     }
     if (req.body.password) {
          if (req.body.password.length < 6) {
               return next(errorHandler(400, 'Password must be at least 6 characters'));
          }
          req.body.password = bcryptjs.hashSync(req.body.password, 10);
     }
     if (req.body.username) {
          if (req.body.username.length < 7 || req.body.username.length >= 20) {
               return next(errorHandler(400, 'Username must be between 7 and 20 characters'));
          }
          if (req.body.username.includes(' ')) {
               return next(errorHandler(400, "Username can't contain spaces"));
          }
          if (req.body.username !== req.body.username.toLowerCase()) {
               return next(errorHandler(400, 'Username must be lowercase'));
          }
          if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
               return next(errorHandler(400, 'Username only contain letters and numbers'));
          }
          try {
               console.log('da vao');
               // await User.findByIdAndUpdate(
               //      req.params.id,
               //      {
               //           username: req.body.username,
               //           email: req.body.email,
               //           profilePicture: req.body.profilePicture,
               //           password: req.body.password,
               //      },
               //      (err, doc) => {
               //           if (err) {
               //                console.log(`Error: ` + err);
               //           } else {
               //                console.log('feawfwefwaf');
               //           }
               //      },
               // );
               const updateUser = await User.findByIdAndUpdate(
                    req.params.userId,
                    {
                         $set: {
                              username: req.body.username,
                              email: req.body.email,
                              profilePicture: req.body.profilePicture,
                              password: req.body.password,
                         },
                    },
                    { new: true },
               );
               const { password: passStoreInfinity, ...returnData } = updateUser._doc;
               res.status(200).json(returnData);
          } catch (er) {
               console.log('toang', er);
               next(errorHandler(404, 'loi khong xac dinh'));
          }
     }
};
