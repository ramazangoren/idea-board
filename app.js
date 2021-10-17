const express  = require('express');
const mysql  = require('mysql');
const path = require('path');
const hbs = require('hbs');
// const router = require('./routes/pages');

const port = 3000
const app = express();

const publicDirectory = path.join(__dirname, 'public')
const viewsPath = path.join(__dirname, 'views');
// const partialsPath = path.join(__dirname, 'partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
// hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = require('./routes/pages');
app.use('/', router)


app.listen(port, (err, res) => {
    console.log('listening on port' + port);
})