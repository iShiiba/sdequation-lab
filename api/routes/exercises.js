const router = require("express").Router();
const Exercise = require("../models/exercise");
const Summary = require("../models/summary");
const Auth = require('../middleware/authMiddleware');


router.post("/", Auth, async (req, res) => {
  const { email, difficulty, equation, right } = req.body;

  if (!email || !difficulty || !equation)
    return res.status(400).send({ error: "Erro! Dados insuficientes" });

  try {
    const userSummary = await Summary.findOne({ email: email });
    if (right) {
      const newSummary = { ...userSummary._doc, right: userSummary.right + 1 };
      await Summary.updateOne({ email: email }, newSummary);
    } else {
      const newSummary = { ...userSummary._doc, wrong: userSummary.wrong + 1 };
      await Summary.updateOne({ email: email }, newSummary);
    }
    await new Exercise({ ...req.body }).save();
    res.status(201).send({ message: "Exercício salvo" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Erro Interno" });
  }
});

router.get("/:email", Auth, async (req, res) => {
  const { email } = req.params;

  if (!email)
    return res
      .status(400)
      .send({ error: " Houve um erro na busca do histórico" });
  try {
    const exerciseList = await Exercise.find({ email: email });

    return res.status(200).send({ exerciseList });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Erro Interno" });
  }
});

module.exports = router;
