const express = require('express');
const { expressConfig } = require('./config/express');
const routerConfig = require('./config/router');

const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/cubical';

start();

async function start() {
    const app = express();

    await mongoose.connect(connectionString);

    console.log('database connected');

    expressConfig(app);
    routerConfig(app);

    app.listen(5000, () => console.log('Server is running on port 5000...'));
}