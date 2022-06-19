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

module.exports = router;