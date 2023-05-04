// node 02-write-file

const fs = require('fs');
const path = require('path');
const readline = require('node:readline');
const {
  stdin: input,
  stdout: output,
} = require('node:process');

const rl = readline.createInterface({ input, output });
const pathToTxt = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(pathToTxt);
const exitDialog = () => {
  console.log('Goodby!');
  process.exit();
};

console.log('Hello! Input something:');

rl.on('line', (input) => {
  const strInput = input.toString();
  if (strInput === 'exit') exitDialog();

  console.log('Do write, don\'t stop (or input \'exit\')');

  writeStream.write(`${strInput}\n`);
});

rl.on('SIGINT', () => {
  exitDialog();
});