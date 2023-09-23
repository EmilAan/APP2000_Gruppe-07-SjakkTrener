const mongoose = require('mongoose');
const åpning = new mongoose.Schema({
    username: String,
    åpningsNavn: String,
    trekkListe: [String]
});

module.exports = mongoose.model("Opening", åpning);
