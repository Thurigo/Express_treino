const express = require('express');
const router = express.Router()

router.use((req , res, next)  => {
    console.log('Tempo')
    next()
})

router.get('/', (req, res) => {
    res.send('Passado home page')
})

router.get('/sobre-passado', (req,res) => {
    res.send('tamo junto');
})

module.exports = router 