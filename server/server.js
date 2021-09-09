const Hapi = require('@hapi/hapi');
const HapiJWT = require('hapi-auth-jwt2');

const users = [
  {
    username: 'Luke',
    password: 'DadSucks', // 'secret'
  },
];

const validate = async (decoded) => {
  const isUserValid = users.find((user) => user.username === decoded.username);
  const isUserNotValid = !isUserValid;

  // do your checks to see if the person is valid
  if (isUserNotValid) {
    return { isValid: false };
  }

  return { isValid: true };
};

const start = async () => {
  const server = Hapi.Server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with'],
      },
    },
  });
  await server.register(HapiJWT);
  server.auth.strategy('jwt', 'jwt', {
    key: 'NeverShareYourSecret', // Never Share your secret key
    validate, // validate function defined above
    verifyOptions: { algorithms: ['HS256'] },
  });

  server.route(require('./routes/authentification/login'));
  server.route(require('./routes/get_results_following_query'));
  server.route(require('./routes/get_results_following_query_and_page'));
  server.route(require('./routes/get_results_detailed'));
  server.route(require('./routes/get_results_detailed_into_wookies'));

  console.log('Server running on %s', server.info.uri);

  try {
    await server.start();
    console.log(`Server listening on port ${server.info.uri}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
