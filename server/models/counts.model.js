const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    count: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, {
    versionKey: false
});


module.exports = mongoose.model('counts', schema);
