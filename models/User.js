const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: {
        type: 'string',
        required: true,
    },

    email: {
        type: 'string',
        required: true,
        unique: true

    },

    age: {
        type: 'number',
    }
})

const user= mongoose.model('User', userSchema);

module.exports = user;