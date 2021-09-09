const axios = require('axios');
const { URL } = require('../config');

const findPeopleById = async (query, id) => {
  const url = `${URL}/${query}/${id}?format=wookiee`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('An error unexpected on findPeopleById', error);
  }
};

module.exports = {
  method: 'GET',
  path: '/{query}/{id}/format=wookiee',
  options: {
    auth: 'jwt',
    handler: (request) => {
      const { query, id } = request.params;
      return findPeopleById(query, id);
    },
  },
};
