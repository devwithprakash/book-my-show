import { pool } from "../../common/config/db.js"
import ApiError from "../../common/utils/api-error.js";
import bcrypt from "bcryptjs";
import { createAccessToken, createRefreshToken } from "../../common/utils/jwt.utils.js";


const hashPassword = async (password) => await bcrypt.hash(password, 12)

const hashToken = async (token) => await bcrypt.hash(token, 12);

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

const register = async ({ name, email, password }) => {
    try {
        const { rows: existing } = await pool.query(
            "select id from users where email = $1",
            [email]
        );

        if (existing[0]) {
            throw ApiError.badRequest("User already exists");
        }

        const hashedPassword = await hashPassword(password);

        const { rows: inserted } = await pool.query(
            "insert into users (name, email, password) values ($1, $2, $3) returning id",
            [name, email, hashedPassword]
        );

        const userId = inserted[0].id;

        const refreshToken = createRefreshToken({ id: userId });
        const accessToken = createAccessToken({ id: userId });

        const hashedToken = await hashToken(refreshToken);

        await pool.query(
            "update users set refresh_token = $1 where id = $2",
            [hashedToken, userId]
        );

        return { accessToken, refreshToken };
    } catch (error) {
        throw ApiError.serverError()
    }
}

const login = async ({ email, password }) => {

    try {
        const { rows } = await pool.query("select * from users where email = $1 limit 1", [email])

        const user = rows[0];
        if (!user) {
            throw ApiError.unauthorized("Invalid email or password");
        }

        const isPasswordMatch = await comparePassword(password, user.password)


        if (!isPasswordMatch) {
            throw ApiError.unauthorized("Invalid email or password")
        }

        const refreshToken = createRefreshToken({ id: user.id })
        const accessToken = createAccessToken({ id: user.id })

        const hashedToken = await hashToken(refreshToken);

        await pool.query(
            "update users set refresh_token = $1 where id = $2",
            [hashedToken, user.id]
        );

        return { accessToken, refreshToken }
    } catch (error) {
        throw ApiError.serverError()
    }
}

export {
    register,
    login
};