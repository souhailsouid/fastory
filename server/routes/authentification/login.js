const Boom = require('boom');
const JWT = require('jsonwebtoken'); // used to sign our content

const { payloadValidator } = require('../../validation/login_validations');

const user = {
  username: 'Luke',
  password: 'DadSucks',
};

const checkUser = (username, password, request) => {
  const isUserNameMatched = user.username === username;
  const isPasswordMatched = user.password === password;
  if (isUserNameMatched && isPasswordMatched) {
    const token = JWT.sign({ ...user }, 'NeverShareYourSecret', {
      expiresIn: 604800, // 1 week
    });
    request.headers.authorization = `Bearer ${token}`;

    return {
      message: 'Authentifiier avec succès!',
      token,
      name: username,
    };
  }
  return Boom.unauthorized("Tes identifiants ont été compromis par l'empire");
};

module.exports = {
  method: 'POST',
  path: '/login',
  handler: async (request, h) => {
    const { username, password } = request.payload;
    return checkUser(username, password, request, h);
  },
  options: {
    validate: {
      payload: payloadValidator,
    },
  },
};
