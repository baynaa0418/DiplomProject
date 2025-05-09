import { verifyAccessToken } from "../../utils/jwt.js";

export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No access token" });

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

export const authorizeRole = (roles) => (req, res, next) => {
  // First check if req.user exists

  console.log("User object:", req.user);  
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }
  
  // Then check if req.user.role exists
  if (!req.user.role) {
    console.log("User object:", req.user); // Add this for debugging
    return res.status(403).json({ error: "Role information missing" });
  }
  
  console.log("User role:", req.user.role);
  
  // Finally check if the role is allowed
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Insufficient permission" });
  }
  
  next();
};
