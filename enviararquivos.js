const express = require('express');
const path = require('path');  // Adicione esta linha para importar o módulo path
const app = express();
const port = 3000;

app.get('/file/:name', function (req, res, next) {
    var options = {
        root: path.join(__dirname, 'public'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }

    var fileName = req.params.name;
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

app.listen(port, () => {
    console.log('enviar arquivos');
});
