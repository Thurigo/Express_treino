const express = require('express');
const app = express();
const port = 3000;


app.get('/exemplo/1', (req, res) => {
    res.send('exemplo A')
})


app.get('/exemplo/b', (req, res, next) => {
    console.log('esperando a proxima função')
    next()
}, (req, res) => {
    res.send('Ola ponto B', i)
})



const cb0 = function (req, res, next) {
    console.log('CB0')

    next()
}

const cb1 = function (req, res, next) {
    console.log('CB1')
    req =+ 12
    next()
}

app.get('/examplo/c', [cb0, cb1], (req, res, next) => {
    console.log('Espera passar pela outras funções')
    next()
}, (req, res) => {
    res.send('Exemplo C de rota', req)
})
// vai passar pelas funções cb0 e cb1 para depois sair a resopsta 



app.listen(port, () => {
    console.log(`Manipulando rotas ${port}`)
})