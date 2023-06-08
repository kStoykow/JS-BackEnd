const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const secretKey = 'mySecretKey';

function expressConfig(app) {
    //express + handlebars
    const hbs = handlebars.create({ extname: '.hbs' });
    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs');
    app.set('views', './src/views');

    //static
    app.use(express.static('src/static'));

    //bodyparser
    app.use(bodyParser.urlencoded({ extended: true }));

    //cookie-parser
    app.use(cookieParser());
}
module.exports = {
    expressConfig,
    secretKey
}