const mongoose = require('mongoose');

const db = 'bookingUni'; // TODO set database
const MONGOOSE_CONNECTIONSTRING = `mongodb://127.0.0.1:27017/${db}`;

module.exports = async (app) => {
    try {
        await mongoose.connect(MONGOOSE_CONNECTIONSTRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        console.log('Database connected.');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}