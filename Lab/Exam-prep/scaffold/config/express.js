const express = require('express');
const handlebars = require('express-handlebars').create({ extname: '.hbs' });
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    app.engine('.hbs', handlebars.engine);
    app.set('view engine', '.hbs');

    app.use(express.urlencoded({ extended: true }));
    app.use('/static/', express.static('static'));

    app.use(cookieParser());
    // TODO add middlewares if needed
}