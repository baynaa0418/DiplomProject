import jwt from "jsonwebtoken";

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: "7d" });
};

const verifyAccessToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

const verifyRefreshToken = (token) =>
  jwt.verify(token, process.env.REFRESH_SECRET);

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
