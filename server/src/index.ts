import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import authRouter from './routes/user.route'
import { PORT } from './constants/env';
import connectDB from './config/db';
import errorHandler from './middleware/errorHandler';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/v1/auth' , authRouter)

app.use(errorHandler)
app.listen(PORT, async() => {
    await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});