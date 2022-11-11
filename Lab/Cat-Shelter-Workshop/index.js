const express = require('express');
const hbr = require('express-handlebars');
const handlebars = hbr.create({ extname: '.hbs' });

const app = express();

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

app.use('/static', express.static('static'));


const homeRouter = require('./controllers/home');
const addBreedRouter = require('./controllers/addBreed');
const addCatRouter = require('./controllers/addCat');

app.use('/', homeRouter);
app.use('/cats', addBreedRouter);
app.use('/cats', addCatRouter);

app.listen(3000);