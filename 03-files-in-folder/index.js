// node 03-files-in-folder

const fs = require('fs');
const { join } = require('path');
const path = require('path');

const pathToFile = join(__dirname, 'secret-folder');

fs.readdir(pathToFile, (err, objects) => {
  if(err) throw err;
  objects.forEach(obj => {
    const baseNameWithPath = join(pathToFile, obj);
    fs.stat(baseNameWithPath, (err, stats) => {
      if(err) throw err;
      if(!stats.isFile()) return;

      const ext = path.extname(baseNameWithPath);
      console.log(`${path.basename(baseNameWithPath, ext)} - ${ext.split('.')[1]} - ${stats.size / 1024}kb`);
    });
  });
});