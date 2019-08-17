const http = require('http');
const readDir = require('./read-dir');

function app(options) {
  const dir = options.dir || './shared';

  const requestHandler = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ files: readDir(dir) }));
  };

  return http.createServer(requestHandler);
}

module.exports = app;
