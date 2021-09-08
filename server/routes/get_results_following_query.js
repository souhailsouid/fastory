const axios = require('axios');
const { URL } = require('../config');

const response = async (query) => {
  const url = `${URL}/${query}/`;
  try {
    const result = await axios.get(url);
    return result.data;
  } catch (error) {
    throw new Error('An error unexpected on findPeople', error);
  }
};

module.exports = {
  method: 'GET',
  path: '/{query}',
  options: {
    auth: 'jwt',
    handler: (request) => {
      const { query } = request.params;
      return response(query);
    },
  },
};
