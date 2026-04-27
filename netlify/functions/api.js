const serverless = require('serverless-http');
const app = require('../../server');

const handler = serverless(app, {
  basePath: '/.netlify/functions/api',
  binary: ['application/pdf', 'application/octet-stream']
});

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return handler(event, context);
};
