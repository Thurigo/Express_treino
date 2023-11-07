const express = require('express');
const app = express();
const port = 3333;

app.get('/', (req, res) => {
    res.send('Getzão bolado')
})

app.get('/a/', (req, res) => {
    res.send('Get 2 bolado');
});

app.get(/.*fly$/, (req, res) => {
    res.send('/.*fly$/')
});
// O final do Link deve ser fly independente do lugar do link


app.get('/ab*cd', (req, res) => {
    res.send('ab*cd')
})
//O começo tem que ser ab e o meio pode ser qualquer coisa e o final deve se cd 


app.listen(port, () => {
    console.log(`Ouvindo a porta ${port}`)
})