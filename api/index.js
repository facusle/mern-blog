import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose
     .connect(process.env.MONGO)
     .then(() => {
          console.log('mongodb is connected');
     })
     .catch((err) => {
          console.log('bug roi may oi: ', err);
     });

const app = express();

app.listen(3000, () => {
     console.log('server listening on port 3000!!');
});
