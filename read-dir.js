const fs = require('fs');
const path = require('path');

function readDir(basePath, baseDir, options) {
  const opts = (!options) ? { filters: {} } : options;
  function recursive(dir) {
    return fs.readdirSync(dir)
      .map(name => {
        const p = path.join(dir, name);
        const relativePath = path.relative(basePath, p)
        if (fs.statSync(p).isDirectory()){
          if (opts.filters.leaf === undefined || opts.filters.leaf === 'false') {
            return {
              name: name,
              leaf: false,
              files: recursive(p),
              hrefs: {
               download: '/api/download/zip?path=' + relativePath,
               list: '/api/files?path=' + relativePath,
              },
            }
          } else return null;
        } else {
          if (opts.filters.leaf === undefined || opts.filters.leaf === 'true') {
            return {
              name: name,
              leaf: true,
              files: [],
              hrefs: {
               download: '/api/download/file?path=' + relativePath,
              },
            }
          } else return null;
        }
      })
      .filter(node => node !== null);
  }

  return recursive(path.join(path.normalize(basePath), path.normalize(baseDir)));
}

module.exports=readDir;
