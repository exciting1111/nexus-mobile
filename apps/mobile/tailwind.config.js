// const colors = require('tailwindcss/colors');
const tinycolor2 = require('tinycolor2');

const {
  themeColors,
  themeColorsNext2024,
} = require('@rabby-wallet/base-utils');

const [classicalColors, next2024Colors] = [
  themeColors,
  themeColorsNext2024,
].map(palette => {
  const rabbyColors = ['light', 'dark'].reduce(
    (accu, theme) => {
      Object.entries(palette[theme]).forEach(([cssvarKey, colorValue]) => {
        const tinyColor = tinycolor2(colorValue);
        const alpha = tinyColor.getAlpha();

        const hexValue = alpha
          ? tinyColor.toHexString()
          : tinyColor.toHex8String();

        if (!accu.auto[cssvarKey]) {
          accu.auto[cssvarKey] = colorValue;
        }

        accu[theme][cssvarKey] = hexValue;
      });

      return accu;
    },
    {
      light: {},
      dark: {},
      auto: {},
    },
  );

  return rabbyColors;
});

/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [
    './index.js',
    './src/*.{js,jsx,ts,tsx,html}',
    './src/components/**/*.{js,jsx,ts,tsx,html}',
    './src/hooks/**/*.{js,jsx,ts,tsx,html}',
    './src/screens/**/*.{js,jsx,ts,tsx,html}',
    './src/utils/**/*.{js,jsx,ts,tsx,html}',
  ],
  theme: {
    spacing: [
      0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 60, 80,
    ].reduce((m, n) => {
      m[n] = n;
      return m;
    }, {}),
    screens: {},
    colors: {
      // Rabby Original Colors
      [`${'r-'.replace(/\-$/, '')}`]: classicalColors.auto,
      [`${'rabby-'.replace(/\-$/, '')}`]: classicalColors.auto,
      [`${'r2-'.replace(/\-$/, '')}`]: next2024Colors.auto,

      ['light']: classicalColors.light,
      ['dark']: classicalColors.dark,

      // Nexus Design System Injection
      'nexus-primary': '#8B5CF6',
      'nexus-secondary': '#10B981',
      'nexus-bg-dark': '#09090B',
      'nexus-bg-light': '#FFFFFF',
      'nexus-card': 'rgba(255, 255, 255, 0.05)',
      'nexus-overlay': 'rgba(0, 0, 0, 0.8)',
    },
    fontSize: {
      'xs': 12,
      'sm': 14,
      'base': 16,
      'lg': 18,
      'xl': 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },
    extend: {
      colors: {},
    },
  },
  plugins: [],
};
