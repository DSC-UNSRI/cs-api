const AuthHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'auth',
  version: '1.0',
  register: (server, { service }) => {
    const authHandler = new AuthHandler(service);
    server.route(routes(authHandler));
  },
};