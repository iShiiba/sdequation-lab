const router = require("express").Router();
const { User } = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/logout", async (req, res) => {
  try {
    res.status(200).send({message: "Deslogado com sucesso" });
  } catch (error) {
    res.status(500).send({ message: "Erro Interno" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Email Inválido" });
    }

    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword) {
      return res.status(401).send({ message: "Senha Incorreta" });
    }
    const token = jwt.sign({ email: user.email }, process.env.JWTPRIVATEKEY, {
      expiresIn: "7d",
    });
    res.status(200).send({ data: token, message: "Logado com sucesso" });
  } catch (error) {
    res.status(500).send({ message: "Erro Interno" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
