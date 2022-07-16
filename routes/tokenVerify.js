const jsonwebtoken = require("jsonwebtoken");
const tokenVerify = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    jsonwebtoken.verify(
      token,
      `${process.env.LOGIN_SECRET}`,
      (err, decoded) => {
        if (err) {
          console.log(err);
          next("authorization failed" + err);
        } else {
          const { name, email } = decoded;
          console.log(name, email);
          req.name = name;
          req.email = email;
          next();
        }
      }
    );
  } catch (error) {
    next("authorization failed" + error);
  }
};
module.exports = tokenVerify;
