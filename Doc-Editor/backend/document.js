const { Schema, model } = require('mongoose');

const DocumentSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        default: {}
    },
   
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Document = model('Document', DocumentSchema);
module.exports = Document;