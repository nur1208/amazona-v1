import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const { _id, name, email, isAdmin } = user;
  return jwt.sign(
    { _id, name, email, isAdmin },
    process.env.JWT_SECRET || "somethingSecret",
    { expiresIn: "30d" }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingSecret",
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid Token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  }
};
