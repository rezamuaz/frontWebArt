module.exports = {
    plugins: [
      'postcss-import',
      'tailwindcss/nesting',
      'tailwindcss',
      'autoprefixer',
        ],
  };

  // 'tailwindcss/nesting':'postcss-nesting',
  //     'postcss-preset-env': { stage: 2, features: { 'nesting-rules': false } },
  //     tailwindcss: {},
  //     ...(process.env.NODE_ENV === 'production'
  //       ? {
  //           '@fullhuman/postcss-purgecss': {
  //             content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  //             defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  //           },
  //         }
  //       : {}),