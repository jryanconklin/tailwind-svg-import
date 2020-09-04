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

function getSvgs(options) {
  if (isEmpty(options.dirs) || isEmpty(options.colors)) {
    console.error(`Requires options.colors and options.dirs in Tailwind options.`);
    return undefined;
  }
  const { dirs, colors, colorize } = options;
  const svgs =
    Object.keys(dirs).length === 1
      ? readSvg(Object.values(dirs)[0])
      : mergeSvgs(dirs);

  return colorize ? mergeColors(colors, svgs) : svgs;
}

module.exports = function ({ addUtilities, addComponents, theme }) {
  function processVars(options) {
    if (isEmpty(options)) {
      return;
    }

    const svgs = getSvgs(options);
    const newComponents = Object.entries(svgs).reduce((acc, [k, v]) => {
      acc[k] = { ':root': `url(${v})` }
      return acc;
    }, {})

    addComponents(newComponents);
  }

  function processUtilities(options) {
    if (isEmpty(options)) {
      return;
    }
    const svgs = getSvgs(options);
    const newUtilities = Object.entries(svgs).reduce((acc, [k, v]) => {
      acc[k] = { backgroundImage: `url(${v})` }
      return acc;
    }, {})

    addUtilities(newUtilities);
  }

  function registerSvgs() {
    const options = resolveOptions(theme('svgImport'));
    if (options.mode === 'all' || options.mode === 'vars') {
      processVars(options);
    }
    if (options.mode === 'all' || options.mode === 'utils') {
      processUtilities(options);
    }
  }

  registerSvgs();
};
