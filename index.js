// Module Dependencies
const path = require('path');
const fs = require('fs');
const svgToDataUri = require('mini-svg-data-uri');

// Tailwind Options
const defaultOptions = require('./src/defaultOptions');

function readSVG(dir) {
  const tail = '.svg';
  // Read the directory, get the files.
  return fs
    .readdirSync(dir)
    .filter((file) => file.includes(tail))
    .reduce((acc, filePath) => {
      const name = filePath.replace(tail, '');
      try {
        acc[name] = svgToDataUri(
          fs.readFileSync(path.join(dir, filePath), 'utf8')
        );
      } catch (err) {
        console.log(`file read error ${filePath}: ${err}`);
      }
      return acc;
    }, {});
}

module.exports = {};
