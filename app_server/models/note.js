const mongoose = require('mongoose');
 
const note_schema = mongoose.Schema({
    title: String,
    content: String}, {
    timestamps:true
    }
    );

module.exports = mongoose.model('note',note_schema);