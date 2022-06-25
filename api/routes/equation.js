const router = require("express").Router();

router.get('/', async (req, res) => {
    const {difficulty} = req.body
    let a = 1;
    let b = Math.round(Math.random() * 5) + 1
    let c = Math.round(Math.random() * 10) + 1;
    if(difficulty !== 'facil'){
        a = 2;
        b = Math.round(Math.random() * (15 - (-5)) + (-5))
        c = Math.round(Math.random() * (20 - (-10)) + (-10))
    }

    try {
        return res.status(200).send(`${a}x² ${b>0?"+ "+b:b}x ${c>0?"+ "+ c:c} = 0`);
    } catch (err) {
        console.log(err)
        res.status(500).send({message: "Erro Interno"})
    }
})

router.get('/answer', async (req, res) => {
    const {a,b,c,x1,x2} = req.body
    const delta = (b*b) - (4*a*c)
    
    const result1 = (-b - Math.sqrt(delta))/2*a
    const result2 = (-b + Math.sqrt(delta))/2*a

    const correct = (result1 === x1 || result1 === x2) && (result2 === x1 || result2 === x2)

    return res.status(200).send({correct});
})

module.exports = router;