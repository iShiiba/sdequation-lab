const router = require("express").Router();
const {User, validate} = require("../models/user");
const bcrypt = require("bcrypt")
const Summary = require('../models/summary')

router.post("/", async(req,res)=> {
    try{
        const {error} = validate(req.body)
        if(error){
            return res.status(400).send({message: error.details[0].message})
        }
        const user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(409).send({message: "Email já cadastrado"})
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password,salt)

        await new User({...req.body, password: hashPassword}).save();
        await new Summary({name: req.body.name, email: req.body.email, right: 0, wrong: 0}).save();
        res.status(201).send({message: "Usuário criado com sucesso"})
    }catch(error){
        console.log(error)
        res.status(500).send({message: "Erro Interno"})
    }
})

router.put('/', async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password ) return res.status(400).send({ error: 'Houve um erro no update, dados insuficientes' })
    
    try {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(password,salt)


        const updatedUser = {name: name, email: email, password: hashPassword }
        await User.findOneAndUpdate({email: email}, updatedUser)

        const userSummary = await Summary.findOne({email: email})
        const newSummary = {...userSummary._doc,name: name}
        await Summary.findOneAndUpdate({email:email},newSummary)

        res.status(204).send({ message: 'Usuário atualizado com sucesso' })
    } catch (err) {
        console.log(err)
        res.status(500).send({message: "Erro Interno"})
    }
})

module.exports = router;