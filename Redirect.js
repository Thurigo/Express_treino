const express = require('express');
const app = express();
const port = 4000;

app.get('/rediciona', (req, res) => {
    res.redirect('/tamojunto');
});


app.get('/tamojunto', (req, res) => {
    res.send('http');
});

app.get('/Back', (req, res) => {
    res.redirect('back')
});



app.listen(port, () => {
    console.log('Redirect')
});