import express from 'express'
import { loginHandler, logoutHandler, refreshHandler, registerHandler } from '../controller/auth.controller'
const authRouter = express.Router()

authRouter.route('/login').post(loginHandler)
authRouter.route('/register').post(registerHandler)
authRouter.route('/logout').get(logoutHandler)
authRouter.route('/refresh').get(refreshHandler)

export default authRouter
