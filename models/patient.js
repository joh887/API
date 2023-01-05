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
    },
    doctor:{
        type: String
    },
    prefered_date:{
        type: String
    }
})

module.exports = mongoose.model('Patient',patientSchema)