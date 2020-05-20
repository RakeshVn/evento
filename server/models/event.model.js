const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String, required: true,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
    },
    mobile: { type: String, required: true },
    type: { type: String, required: true },
    tickets: { type: Number, required: true },
    regNumber: { type: String, required: true },
    idCard: { type: String },
    accepted: { type: String, default: false },
    createdAt: { type: Date, default: Date.now }
}, {
    versionKey: false
});


module.exports = mongoose.model('event', schema);
