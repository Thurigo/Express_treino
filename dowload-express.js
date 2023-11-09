const express = require('express');
const app = express();
const port = 30000;


app.get('/download', (req, res) => {
    console.log('Certo ')
    res.download('./public/Arthur.png', 'Arthur.png', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao fazer o download.');
        } else {
            console.log('Download bem-sucedido.');
        }
    });
    console.log('Certo2 ')
})






app.listen(port, () => {
    console.log('tamo junto')
})