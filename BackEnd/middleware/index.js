const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

        // If token is missing, send 401 Unauthorized response
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Verify the token
        const decoded = jwt.verify(token, "your_secret_key");

        // If verification succeeds, attach decoded user information to request object and proceed
        req.user = decoded;
        next();
    } catch (error) {
        // If verification fails, send 403 Forbidden response
        return res.status(403).json({ message: "Forbidden" });
    }
};

module.exports = authMiddleware;
