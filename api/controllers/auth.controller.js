import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
     const { email, username, password } = req.body;

     if (!email || !username || !password || email === '' || username === '' || password === '') {
          return res.status(400).json({ message: 'All fields are required' });
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
          res.status(500).json({ message: 'has problem when signup' + error });
     }
};
