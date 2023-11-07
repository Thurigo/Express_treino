const express = require('express');
const app = express();
const port = 3333;

app.get('/', (req,res) => {
    res.send('Getzão bolado')
})

app.get('/2/', (req, res) => {
    res.send('Get 2 bolado');
});

app.get(/.*fly$/, (req, res) => {
    res.send('/.*fly$/')
})



app.listen(port, () => {
    console.log(`Ouvindo a porta ${port}`)
})