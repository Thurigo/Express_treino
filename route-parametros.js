const express = require('express');
const app = express();
const port = 3000;

app.get('/usuario/:userId/Livros/:boo1kId', (req, res) => {
    res.send(req.params)
})
// http://localhost:3000/usuario/34/Livros/89891

app.get('/usuario/:userId-:boo1kId', (req, res) => {
    res.send(req.params)
})

// http://localhost:3000/usuario/34-89891



app.get('/usuario/:userId.:boo1kId', (req, res) => {
    res.send(req.params)
})

// http://localhost:3000/usuario/34.89891



app.listen(port, () => {
    console.log(`Ouvindo a port ${port}`)
});