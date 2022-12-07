const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, minlength: [5, 'Password must be atleast 5 chars.'] },
    booked: { type: [String], default: [] },
    hotels: { type: [Types.ObjectId], ref: 'Hotel', default: [] }
});

//TODO add needed properties and validations to model
userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;