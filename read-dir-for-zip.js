const fs = require('fs');
const path = require('path');

function readDirForZip(basePath, baseDir) {
  const startDir = path.join(path.normalize(basePath), path.normalize(baseDir));
  const files = [];
  function recursive(dir) {
    return fs.readdirSync(dir)
      .map(name => {
        const p = path.join(dir, name);
        if (fs.statSync(p).isDirectory()){
          recursive(p);
        } else {
          files.push({ path: p, name: path.join(path.basename(baseDir), path.relative(startDir, p)) })
        }
      });    
  }

  recursive(startDir);
  return files;
}

module.exports=readDirForZip;
