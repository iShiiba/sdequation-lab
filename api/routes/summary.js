const router = require("express").Router();
const Summary = require("../models/summary");
const Auth = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
    const code = req.query.admCode;
    console.log(code)
    if(code!== '2020191918181717161615151414131312121111'){
        return res.status(403).send({ message: "Acesso não autorizado" });
    }
  try {
    const summaryList = await Summary.find({});

    return res.status(200).send({ summaryList });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Erro Interno" });
  }
});

router.get("/:email", Auth, async (req, res) => {
  const { email } = req.params;

  if (!email) return res.status(400).send({ error: " Houve um erro na busca" });
  try {
    const summaryInfo = await Summary.findOne({ email: email });

    return res.status(200).send({ summaryInfo });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Erro Interno" });
  }
});

module.exports = router;
