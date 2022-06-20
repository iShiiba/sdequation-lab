const router = require("express").Router();
const Summary = require("../models/summary");

router.get('/', async (req, res) => {
    try {
        const summaryList = await Summary.find({});

        return res.status(200).send({ summaryList });
    } catch (err) {
        console.log(err)
        res.status(500).send({message: "Erro Interno"})
    }
})

router.get('/:email', async (req, res) => {
    const { email } = req.params;

    if (!email) return res.status(400).send({ error: ' Houve um erro na busca' })
    try {
        const summaryInfo = await Summary.findOne({email: email});

        return res.status(200).send({ summaryInfo });
    } catch (err) {
        console.log(err)
        res.status(500).send({message: "Erro Interno"})
    }
})

module.exports = router;