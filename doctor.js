const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    monday:{
        type: Boolean,
        required: false,
        default: false
    },
    tuesday:{
        type: Boolean,
        required: false,
        default: false
    },
    wednesday:{
        type: Boolean,
        required: false,
        default: false
    },
    thursday:{
        type: Boolean,
        required: false,
        default: false
    },
    friday:{
        type: Boolean,
        required: false,
        default: false
    }
})

module.exports = mongoose.model('Doctor',doctorSchema)