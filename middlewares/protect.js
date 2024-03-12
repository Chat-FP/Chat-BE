// protect midelware
import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.token;

  // If no token, reject the request
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload to request object
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default protect;
