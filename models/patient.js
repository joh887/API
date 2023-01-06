const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 32,
        validation: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    },
    phoneNumber:{
        type: Number,
        required: true,
        maxLength: 10,
        validate: {
            validator: function(v) {
                return /^[0-9]+$/.test(v);
            }
        }
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
}, {timestamps:true}, {collection: 'patients'})

module.exports = mongoose.model('Patient',patientSchema)