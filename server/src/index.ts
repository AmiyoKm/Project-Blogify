import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import authRouter from './routes/auth.route'
import { PORT } from './constants/env';
import connectDB from './config/db';
import errorHandler from './middleware/errorHandler';
import cookieParser from 'cookie-parser';
import { authenticate } from './middleware/authenticate';
import userRouter from './routes/user.route';
import sessionRouter from './routes/session.route';
const app = express();
app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/v1/auth' , authRouter)

app.use("/api/v1/user" , authenticate , userRouter)
app.use("/api/v1/session" , authenticate , sessionRouter)

app.use(errorHandler)
app.listen(PORT, async() => {
    await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});