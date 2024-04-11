require("dotenv").config();
const jwt = require("jsonwebtoken");
const { userMassage } = require("./message");

const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer "))
    return res.status(403).json({ message: userMassage.error.tokenMissing });

  const token = authorizationHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err)
      return res.status(401).json({ message: userMassage.error.unauthorized });
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
