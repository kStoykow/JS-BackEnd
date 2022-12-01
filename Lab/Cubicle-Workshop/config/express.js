const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const secretKey = 'my-secret-token';

module.exports = (app) => {
    //TODO: Setup the view engine
    //TODO: Setup the body parser
    //TODO: Setup the static files
    const hbr = handlebars.create({ extname: '.hbs' });
    app.engine('.hbs', hbr.engine);
    app.set('view engine', '.hbs');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/static/', express.static('static'));

    app.use(cookieParser());

    //middleware
    app.use((req, res, next) => {
        const token = req.cookies.token;
        if (token) {
            try {
                const data = jwt.verify(token, secretKey);
                req.user = data;
            } catch (error) {

            }
        }
        next();
    });
};