const express = require('express');
const app = express();
const path = require('path');

const readDir = require('./read-dir');
const readDirForZip = require('./read-dir-for-zip');
const zip = require('express-zip');

module.exports = (options) => {
  const baseDir = options.dir || './shared';

  app.get('/api/files', (request, response) => {
    const dir = request.query.path || '/';
    console.log(`ACCESS '/api/files?path=${dir}'`);

    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ files: readDir(baseDir, dir) }));
  });

  app.get('/api/download/zip', function (request, response) {
    const dir = request.query.path || '/';
    console.log(`ACCESS '/api/download/zip?path=${dir}'`);

    response.zip(readDirForZip(baseDir, dir), path.basename(`${dir}.zip`));
  });

  return app;
}
