import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class LoginDto extends BaseDto{
    static schema = Joi.object({
        email: Joi.string().email().trim().lowercase().required(),
        password: Joi.string()
            .min(8)
            .max(100)
            .pattern(/^[A-Za-z0-9]+$/)
            .required()
            .messages({
                "string.empty": "Password is required"
            }),
    })
}

export default LoginDto;