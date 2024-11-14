const jwt = require('jsonwebtoken');
const User = require('../users/user.model');

// Ensure that this is properly loaded from .env
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const generateToken = async (userId) => {
    try {
        // Fetch user from the database
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User Not Found");
        }

        // Generate JWT token
        const token = jwt.sign({
            userId: user.id,
            role: user.role
        }, JWT_SECRET, { expiresIn: '1h' });

        // Return the generated token
        return token;

    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Failed to generate token");
    }
}

module.exports = generateToken;
