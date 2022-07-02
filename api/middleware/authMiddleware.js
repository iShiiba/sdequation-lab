const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  const token = req.headers["token"];
  console.log(token);
  if (token) {
    try {
      const verified = jwt.verify(token, process.env.JWTPRIVATEKEY);
      req.user = verified;      
    } catch (err) {
      return res.status(401).send("Token inválido");
    }
    return next();
  } else {
    return res.status(403).send("Não autorizado");
};
  }


module.exports = Auth;
