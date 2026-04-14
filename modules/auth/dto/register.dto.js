import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js"

class RegisterDto extends BaseDto {
    static schema = Joi.object({
        name: Joi.string().trim().min(2).max(50).required(),
        email: Joi.string().email().trim().lowercase().required(),
        password: Joi.string()
            .min(8)
            .max(100)
            .pattern(/^[A-Za-z0-9]+$/)
            .required()
            .messages({
                "string.min": "Password must be at least 8 characters",
                "string.pattern.base":
                    "Password must include uppercase, lowercase and number"
            }),
        role: Joi.string().valid("user", "admin").default("user"),
    })
}

export default RegisterDto;