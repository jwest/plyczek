const express = require('express');
const app = express();

const readDir = require('./read-dir');

module.exports = (options) => {
  const baseDir = options.dir || './shared';

  app.get('/api/files', (request, response) => {
    const dir = request.query.path;
    console.log(`ACCESS '/api/files?path=${dir}'`);

    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ files: readDir(baseDir, dir) }));
  });

  return app;
}
