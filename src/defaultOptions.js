const defaultTheme = require('tailwindcss/resolveConfig')(
  require('tailwindcss/defaultConfig')
).theme;

const path = require('path');

// The extraction mode: all|vars|utils
const mode = 'all';
// The alteration colors to add for icons.
const colors = {
  black: defaultTheme.colors.black,
  white: defaultTheme.colors.white,
  blue: defaultTheme.colors.blue[500],
};

// Icon directories to scan.
const outline = path.resolve(__dirname, './heroicons/optimized/outline/');
const solid = path.resolve(__dirname, './heroicons/optimized/solid/');

module.exports = {
  colors,
  colorize: false,
  dirs: {
    outline,
    solid,
  },
  mode,
};
