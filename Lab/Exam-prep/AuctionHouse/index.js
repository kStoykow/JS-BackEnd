const express = require('express');
const mongoose = require('mongoose');
const { PORT, MONGOOSE_URI } = require('./src/config/constants');

const expressConfig = require('./src/config/express');
const routerConfig = require('./src/config/routes');

start();

async function start() {
    const app = express();

    await mongoose.connect(MONGOOSE_URI);

    console.log('database connected');

    expressConfig(app);
    routerConfig(app);

    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
}
