// node 04-copy-directory

const fs = require('fs');
const path = require('path');

const pathToBaseFolder = path.join(__dirname, 'files');
const pathToCopyFolder = path.join(__dirname, 'files-copy');

fs.rm(pathToCopyFolder, { recursive: true, force: true }, (err) => {
  if (err) throw err;

  fs.mkdir(pathToCopyFolder, { recursive: true }, (err) => {
    if (err) throw err;
    console.log('The folder was created/updated!');

    fs.readdir(pathToBaseFolder, (err, files) => {
      if (err) throw err;

      files.forEach((file) => {
        const baseNameWithPath = path.join(pathToBaseFolder, file);
        const copyFileNameWithPath = path.join(pathToCopyFolder, file);

        fs.copyFile(baseNameWithPath, copyFileNameWithPath, (err) => {
          if (err) throw err;
        });
      });
    });
  });
});
