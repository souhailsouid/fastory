const axios = require('axios')
const { URL } = require('../config')

const selectInformationsByQueryAndPage = async (query, page) => {
  const url = `${URL}/${query}/?page=${page}`

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    throw new Error('An error unexpected on findPeople', error)
  }
}

module.exports = {
  method: 'GET',
  path: '/{query}/page/{page}',
  options: {
    handler: (request) => {
      const { query, page } = request.params

      return selectInformationsByQueryAndPage(query, page)
    }
  }
}
