import { User } from '../models/users.js'
import jwt from 'jsonwebtoken'

export const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ success: false, message: "Please login first." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded._id) {
            return res.status(401).json({ success: false, message: "Invalid token." });
        }

        req.user = await User.findById(decoded._id);
        if (!req.user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Authentication failed.", error: error.message });
    }
};
