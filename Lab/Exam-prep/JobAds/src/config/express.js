const express = require('express');
const hbs = require('express-handlebars').create({ extname: 'hbs' });
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const isUser = require('../middlewares/verifyUser');

module.exports = (app) => {
    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs');
    app.set('views', './src/views');

    app.use(express.static('src/static'));

    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cookieParser());
    app.use(isUser);
}