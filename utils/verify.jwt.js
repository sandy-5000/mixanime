import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export default function verify({ token }) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return decoded
    } catch (error) {
        return false
    }
}
