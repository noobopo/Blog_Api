import jwt from 'jsonwebtoken';

export const generateCookie = (user, res, statusCode, message) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });

    res.status(statusCode)
        .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "Production",
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            maxAge: 30 * 60 * 1000, // 30 minutes
            expires: new Date(Date.now() + 30 * 60 * 1000),
        })
        .json({
            success: true,
            message,
        });
};
