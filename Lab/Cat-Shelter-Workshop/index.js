const express = require('express');
const hbr = require('express-handlebars');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const handlebars = hbr.create({ extname: '.hbs' });

const app = express();

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

app.use('/static', express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true }));

const homeController = require('./controllers/home');
const catsController = require('./controllers/cats');
const detailsController = require('./controllers/details');
const editController = require('./controllers/edit');

app.use(homeController);
app.use('/cats', catsController);
app.use('/details', detailsController);
app.use('/edit', editController);

app.get('*', (req, res) => res.render('default'));

app.listen(3000);