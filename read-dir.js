const fs = require('fs');
const path = require('path');

function readDir(basePath) {
  function recursive(dir) {
    return fs.readdirSync(dir)
      .map(name => {
        const p = path.join(dir, name);
        const relativePath = path.relative(basePath, p)
        if (fs.statSync(p).isDirectory()){
          return {
            name: name,
            leaf: false,
            files: recursive(p),
            hrefs: {
             download: '/api/download/zip?path=' + relativePath,
             list: '/api/files?path=' + relativePath,
            },
          }
        } else {
          return {
            name: name,
            leaf: true,
            files: [],
            hrefs: {
             download: '/api/download/file?path=' + relativePath,
            },
          }
        }
      });    
  }

  return recursive(basePath);
}

module.exports=readDir;
