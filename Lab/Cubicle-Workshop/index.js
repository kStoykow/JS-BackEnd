const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/cubical';

start();

async function start() {
    const app = require('express')();

    await mongoose.connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    require('./config/express')(app);
    require('./config/routes')(app);

    console.log('database connected');
    app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
}