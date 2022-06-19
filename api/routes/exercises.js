const router = require("express").Router();
const Exercise = require("../models/exercise")

router.post("/", async(req,res)=> {
    const { email, difficulty, equation } = req.body;

    if (!email || !difficulty || !equation) return res.status(400).send({ error: 'Erro! Dados insuficientes' })

    try{
        await new Exercise({...req.body}).save();
        res.status(201).send({message: "Exercício salvo"})
    }catch(error){
        res.status(500).send({message: "Erro Interno"})
    }
})

module.exports = router;