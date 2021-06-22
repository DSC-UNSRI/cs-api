require('dotenv').config();

const hapi = require('@hapi/hapi');

// event
const eventPlugin = require('./api/event');
const EventService = require('./services/postgres/EventService');
const eventValidator = require('./validator/event');

// auth
const authPlugin = require('./api/auth');

module.exports = (async () => {
  const eventService = new EventService();

  const server = hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: eventPlugin,
      options: {
        service: eventService,
        validator: eventValidator,
      },
    },
    {
      plugin: authPlugin,
      options: {
        service: null,
      },
    },
  ]);

  await server.start();
  console.log(`Server sudah jalan ${server.info.uri}`);
  return server;
})();
