const fs = require('fs');
const { join } = require('path');
const path = require('path');

const pathToFile = join(__dirname, 'secret-folder');

fs.readdir(pathToFile, (err, objects) => {
  if(err) throw err;
  objects.forEach(obj => {
    const baseName = join(pathToFile, obj);
    fs.stat(baseName, (err, stats) => {
      if(err) throw err;
      if(!stats.isFile()) return;

      const ext = path.extname(baseName);
      console.log(`${path.basename(baseName, ext)} - ${ext.split('.')[1]} - ${stats.size / 1024}kb`);
    });
  });
});