const defaultTheme = require('tailwindcss/resolveConfig')(
  require('tailwindcss/defaultConfig')
).theme;

const path = require('path');

const colors = {
  black: defaultTheme.colors.black,
  white: defaultTheme.colors.white,
  gray: defaultTheme.colors.gray[500],
  red: defaultTheme.colors.red[500],
  orange: defaultTheme.colors.orange[500],
  yellow: defaultTheme.colors.yellow[500],
  green: defaultTheme.colors.green[500],
  teal: defaultTheme.colors.teal[500],
  blue: defaultTheme.colors.blue[500],
  indigo: defaultTheme.colors.indigo[500],
  purple: defaultTheme.colors.purple[500],
  pink: defaultTheme.colors.pink[500],
};

module.exports = {
  icons: {
    colors,
    dirs: {
      outline: {
        path: path.resolve(__dirname, '../heroicons/optimized/outline/'),
        mode: 'stroke',
      },
      solid: {
        path: path.resolve(__dirname, '../heroicons/optimized/solid/'),
        mode: 'fill',
      },
    },
  },
};
