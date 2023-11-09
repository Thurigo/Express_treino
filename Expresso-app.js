const express =  require('express');
const app = express();
const port = 30000;
const expresso = require('./Expresso-Router')


console.log(1);
app.use('/Expresso-Router',expresso)
console.log(1);

app.get(/.*fly$/, (req, res) => {
    res.send('/.*fly$/')
});


app.listen(port, () => {
    console.log('Expresso.app')
})