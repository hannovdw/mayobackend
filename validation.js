  
const Joi = require('@hapi/joi');

function RegisterValidation(data) {
    const schema = {
        userEmail: Joi.string().optional().email(),
        userPassword: Joi.string().min(4).required(),
    }

    return Joi.validate(data, schema);
}


function LoginValidation(data) {
    const schema = {
        userEmail: Joi.string().email().required(),
        userPassword: Joi.string().min(4).required()
    }

    return Joi.validate(data, schema);
}

module.exports.RegisterValidation = RegisterValidation;
module.exports.LoginValidation = LoginValidation;