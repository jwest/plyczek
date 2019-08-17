const express = require('express');
const app = express();

const readDir = require('./read-dir');

module.exports = (options) => {
  const dir = options.dir || './shared';

  app.get('/api/files', (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ files: readDir(dir) }));
  });

  return app;
}
