// Module Dependencies
const path = require('path');
const fs = require('fs');
const svgToDataUri = require('mini-svg-data-uri');
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette');

// Lodash Helpers
const isEmpty = require('lodash/isEmpty');

// Tailwind Options
const defaultOptions = require('./src/defaultOptions');

function resolveOptions(userOptions) {
  return userOptions || defaultOptions;
}

function readSvg(dir) {
  const tail = '.svg';
  return fs
    .readdirSync(dir)
    .filter((file) => file.includes(tail))
    .reduce((acc, filePath) => {
      const name = filePath.replace(tail, '');
      try {
        acc[name] = svgToDataUri(fs.readFileSync(path.join(dir, filePath), 'utf8'));
      } catch (err) {
        console.error(`file read error ${filePath}: ${err}`);
      }
      return acc;
    }, {});
}

function mergeSvgs(dirs) {
  return Object.entries(dirs).reduce((acc, [type, dir]) => {
    Object.entries(readSvg(dir)).forEach(([name, content]) => {
      const newKey = `${name}-${type}`;
      acc[newKey] = content;
    });
    return acc;
  }, {});
}

function mergeColors(colors, svgs) {
  const flatColors = flattenColorPalette.default(colors);
  return Object.entries(flatColors).reduce((acc, [color, value]) => {
    const replace = value.replace('#', '%23');
    Object.entries(svgs).forEach(([name, content]) => {
      const newKey = `${name}-${color}`;
      acc[newKey] = content.replace('currentColor', replace);
    });
    return acc;
  }, {});
}

function mergeOptions(options) {
  if (isEmpty(options.svgs.dirs) || isEmpty(options.svgs.colors)) {
    console.error(`Requires svgs.colors and svgs.dirs in Tailwind options.`);
    return undefined;
  }
  const { dirs, colors, colorize } = options.svgs;
  const svgs =
    Object.keys(dirs).length === 1
      ? readSvg(Object.values(dirs)[0])
      : mergeSvgs(dirs);

  return colorize ? mergeColors(colors, svgs) : svgs;
}

module.exports = {};
