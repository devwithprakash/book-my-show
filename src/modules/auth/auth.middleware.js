import ApiError from "../../common/utils/api-error.js";
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";

const authenticate = (req, res, next) => {
    try {
        let token;
        
        if (req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        const decoded = verifyAccessToken(token);
        req.user = { id: decoded.id };

        next();
    } catch (error) {
        throw ApiError.serverError()
    }
};

export { authenticate }