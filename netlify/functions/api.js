const serverless = require('serverless-http');
const app = require('../../server');

const handler = serverless(app, {
  basePath: '/.netlify/functions/api'
});

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return handler(event, context);
};
