const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true

    },
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Patient',patientSchema)