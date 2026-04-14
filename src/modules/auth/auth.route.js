import { Router } from "express";
import validate from "../../common/middleware/validate.middleware.js";
import RegisterDto from "./dto/register.dto.js";
import LoginDto from "./dto/login.dto.js";
import * as controller from "./auth.controller.js"

const authRouter = Router()

authRouter.post("/register", validate(RegisterDto), controller.register)
authRouter.post("/login", validate(LoginDto), controller.login)

export default authRouter