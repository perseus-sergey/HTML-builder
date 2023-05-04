// node 01-read-file

const fs = require('fs');
const path = require('path');

const { stdout } = process;

const pathToTxt = path.join(__dirname, 'text.txt');

let readStream = new fs.createReadStream(pathToTxt, 'utf-8');

// readStream.on('data', (chunk) => console.log(chunk));
readStream.on('data', (chunk) => stdout.write(chunk + '\n'));

// fs.readFile(pathToTxt, 'utf-8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });