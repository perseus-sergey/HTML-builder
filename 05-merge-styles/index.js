// node 05-merge-styles

const fs = require('fs');
const path = require('path');

const pathToBaseFolder = path.join(__dirname, 'styles');
const pathToDistFolder = path.join(__dirname, 'project-dist');
const cssBundleFilePath = path.join(pathToDistFolder, 'bundle.css');
const bundleExtention = path.extname(cssBundleFilePath);

const writeStream = fs.createWriteStream(cssBundleFilePath);

function makeCssBundle() {
  fs.writeFile(cssBundleFilePath, '', (err) => {
    if (err) throw err;
  });

  fs.readdir(pathToBaseFolder, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const baseNameWithPath = path.join(pathToBaseFolder, file.name);

      if (!file.isFile() || path.extname(baseNameWithPath) !== bundleExtention)
        return;

      fs.readFile(baseNameWithPath, 'utf-8', (err, data) => {
        if (err) throw err;
        fs.appendFile(cssBundleFilePath, data, (err) => {
          if (err) throw err;
        });
      });
    });
  });
}

function makeCssBundleStream() {
  fs.writeFile(cssBundleFilePath, '', (err) => {
    if (err) throw err;
  });

  console.log('Make/clear file : ', path.basename(cssBundleFilePath));

  fs.readdir(pathToBaseFolder, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const baseNameWithPath = path.join(pathToBaseFolder, file.name);

      if (!file.isFile() || path.extname(baseNameWithPath) !== bundleExtention)
        return;

      console.log('Add file : ', file.name);
      const readStream = fs.createReadStream(baseNameWithPath, 'utf-8');

      readStream.on('data', (chunk) => {
        writeStream.write(chunk);
      });
    });
  });
}
makeCssBundleStream();
// makeCssBundle();
