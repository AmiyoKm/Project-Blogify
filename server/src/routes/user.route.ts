import express from 'express'
import { loginHandler, logoutHandler, registerHandler } from '../controller/auth.controller'
const authRouter = express.Router()

authRouter.route('/login').post(loginHandler)
authRouter.route('/register').post(registerHandler)
authRouter.route('/logout').get(logoutHandler)

export default authRouter
