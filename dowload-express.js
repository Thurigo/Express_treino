const express = require('express');
const app = express();
const port = 30000; 


app.get('/download', (req,res) => {
    console.log('deu certo')
    res.download('./public', 'Arthur.png')
})






app.listen(port, () => {
    console.log('tamo junto')
})