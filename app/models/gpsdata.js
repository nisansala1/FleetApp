const mongoose = require("mongoose");

const gpsdataSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    latitude : {
        type: String,
        required: true
    },
    longitudet: {
        type: String,
        required: true
    },
    latitudet : {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    updatedate: {
        type: Date,
        default: Date.now(),
        required: false
    },
    model : {
        type: String,
        required: true
    },
    year : {
        type: String,
        required: true
    },
    platen : {
        type: String,
        required: true
    },
    licensen : {
        type: String,
        required: true
    },
    chassisn : {
        type: String,
        required: true
    },
    mileage: {
        type: String,
        required: true
    },
    fuelt: {
        type: String,
        required: true
    },
    _id: {
        type: String,
        required: true
    }

});

const gpsdata = mongoose.model("gpsdata", gpsdataSchema);

module.exports = gpsdata;