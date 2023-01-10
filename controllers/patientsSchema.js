const patientsValidation = (name, phoneNumber, email, email, doctor, prefered_date) => {
    const errors = {};
    if (name === undefined || name === null || name === "") {
        errors.name = "Name is required";
    }
    if (phoneNumber === undefined || phoneNumber === null || phoneNumber === "") {
        errors.phoneNumber = "phoneNumber is required";
    }
    if (email === undefined || email === null || email === "") {
        errors.email = "email is required";
    }
    if (doctor === undefined || doctor === null || doctor === "") {
        errors.doctor = "doctor is required";
    }
    if (prefered_date === undefined || prefered_date === null || prefered_date === "") {
        errors.prefered_date = "prefered_date is required";
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};

const Joi = require('joi');

//what is +$ in phoneNumber
const patientsSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    phoneNumber: joi.string().length(10).pattern(/^[0-9]+$/),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    doctor: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    prefered_date:
        Joi.array().items(Joi.string()
        .valid("monday", "tuesday", "wednesday", "thursday","friday").insensitive())
   // prefered_date: Joi.date().timestamp('javascript')
})




try {
    patientsSchema.validate(
        {name : "Min ",
        phoneNumber: "0102323123124",
        email: "asdasd@gmail.com",
        doctor: "brain",
        prefered_date: "true"}
    );
}
catch (err) { 
    console.log("error");
}


//How do I use the made patientsValidation function?
//There is two patientsSchema, patient and patientsSchema. Which one is used?
module.exports = patientsSchema;