import ApiResponse from "../../common/utils/api-response.js";
import * as authService from "./auth.service.js"

const register = async (req, res) => {
    const { accessToken, refreshToken } = await authService.register(req.body);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    
    ApiResponse.created(res, "User registered successfully", { token: accessToken })
};

const login = async (req, res) => {
    const { accessToken, refreshToken } = await authService.login(req.body);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });

    ApiResponse.ok(res, "User logged in successfully", { token: accessToken })
}



export { register, login }