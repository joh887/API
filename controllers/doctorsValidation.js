const DoctorsValidation = (name, monday, tuesday, wednesday, thursday, friday) => {
    const errors = {};
    if (name === undefined || name === null || name === "") {
        errors.name = "Name is required";
    }
    if (monday === undefined || monday === null || monday === "") {
        errors.monday = "Monday is required";
    }
    if (tuesday === undefined || tuesday === null || tuesday === "") {
        errors.tuesday = "Tuesday is required";
    }
    if (wednesday === undefined || wednesday === null || wednesday === "") {
        errors.wednesday = "Wednesday is required";
    }
    if (thursday === undefined || thursday === null || thursday === "") {
        errors.thursday = "Thursday is required";
    }
    if (friday === undefined || friday === null || friday === "") {
        errors.friday = "Friday is required";
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};

const Joi = require('joi');

const doctorsSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    monday: Joi.boolean().truthy('true').falsy('false'),
    tuesday: Joi.boolean().truthy('true').falsy('false'),
    wednesday: Joi.boolean().truthy('true').falsy('false'),
    thursday: Joi.boolean().truthy('true').falsy('false'),
    friday: Joi.boolean().truthy('true').falsy('false'),
})




try {
    doctorsSchema.validate(
        {name : "brian ",
        monday: "true",
        tuesday: "true",
        wednesday: "true",
        thursday: "true",
        friday: "true"}
    );
}
catch (err) { 
    console.log("error");
}

module.exports = doctorsSchema;