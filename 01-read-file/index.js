const fs = require('fs');
const path = require('path');

const pathToTxt = path.join(__dirname, 'text.txt');

let readStream = new fs.createReadStream(pathToTxt, 'utf-8');

readStream.on('data', (chunk) => console.log(chunk));