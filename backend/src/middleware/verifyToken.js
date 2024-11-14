const jwt = require('jsonwebtoken');

// Ensure the JWT_SECRET_KEY is set in your environment variables
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
    // 1. Get the token from cookies
    const token = req.cookies.token;
    // const token = req.headers["authorization"].split(" ")[1]

    // 2. Check if the token exists
    if (!token) {
        return res.status(401).send({ message: "No token, authorization denied" });
    }

    // 3. Verify the token
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Token is not valid" });
        }

        // 4. Attach the decoded user info to the request object
        req.user = decoded;  // The decoded token usually contains user info like userId, role, etc.
        
        // 5. Call the next middleware or route handler
        next();
    });
};

module.exports = verifyToken;
