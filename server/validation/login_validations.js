const Joi = require('joi')

// We want 'username' and 'password' to be required

const payloadValidator = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})

module.exports = { payloadValidator }
