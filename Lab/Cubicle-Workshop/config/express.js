const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = (app) => {
    //TODO: Setup the view engine
    const hbr = handlebars.create({ extname: '.hbs' });
    app.engine('.hbs', hbr.engine);
    app.set('view engine', '.hbs');

    //TODO: Setup the body parser
    app.use(bodyParser.urlencoded({ extended: true }));

    //TODO: Setup the static files
    app.use('/static/', express.static('static'));
};