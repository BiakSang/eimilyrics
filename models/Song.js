const mongoose = require("mongoose")

const SongSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 4,
        maxlength: 300,
        required: true
    },
    writer: {
        type: String,
        maxlength: 100,
        default: ""
    },
    category: {
        type: String,
        minlength: 1,
        maxlength: 1,
        required: true
    },
    dialect: {
        type: String,
        minlength: 3,
        maxlength: 11,
        required: true
    },
    lyrics: {
        type: String,
        minlength: 100,
        maxlength: 10000,
        required: true
    },
    youtube: {
        type: String,
        minlength: 11,
        maxlength: 11,
        default: ""
    },
    popularity: {
        type: String,
        unique: true,
        required: true
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
})

const SongModel = mongoose.model("songs", SongSchema)

module.exports = SongModel