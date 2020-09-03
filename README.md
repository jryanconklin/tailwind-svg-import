# Tailwind SVG Import

This project adds handling for file system SVGs into Tailwind content.

The goal of the project is to allow you to provide Tailwind a directory and add those directly to utilities or components based on mode. It also optionally allows for SVGs to be colorized with additional configuration.

## Install

1. Install the plugin:

  ```bash
  # Using npm
  npm install tailwind-svg-import --save-dev

  # Using Yarn
  yarn add tailwind-svg-import -D
  ```

2. Add it to your `tailwind.config.js` file:

  ```js
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      require('tailwind-svg-import')
    ]
  }
  ```

## Documentation

### Options

* `colors`: Object. Define the colors you wish to use for colorize.
* `colorize`: Boolean. Optionally replace `currentColor` in your SVG with provided colors.
* `dirs`: Object. The file directories this plugin should scan.
* `mode`: String (all|vars|utils). Add CSS vars or SVGs, utility classes, or both.

####

#### Default Options

By default this project `git clone` a copy of Tailwind's heroicons project.
This will be improved in the future, but is a reasonable starting place.
You can either use Tailwind's or update to your file system using the `dirs` option key.

```
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

// Icon directories to scan.
const outline = path.resolve(__dirname, '../heroicons/optimized/outline/');
const solid = path.resolve(__dirname, '../heroicons/optimized/solid/');

console.log(outline);

module.exports = {
  svgs: {
    colors,
    colorize: false,
    dirs: {
      outline,
      solid,
    },
    mode,
  },
};
```

## Local development

1. Clone the repository:

    ```bash
    git clone https://github.com/jryanconklin/tailwind-svg-import tailwind-svg-import

    cd tailwind-svg-import
    ```

2. Install the dependencies:

    ```bash
    # Using npm
    npm install

    # Using Yarn
    yarn
    ```

3. Add as a plugin to your project.
