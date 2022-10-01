SystemJS.config({
  baseURL: 'https://unpkg.com/',
  defaultExtension: true,
  packages: {
    ".": {
      main: '/src/App.js',
      defaultExtension: 'js'
    }
  },
  meta: {
    '*.js': {
      'babelOptions': {
        react: true
      }
    }
  },
  map: {
    'plugin-babel': 'systemjs-plugin-babel@latest/plugin-babel.js',
    'systemjs-babel-build': 'systemjs-plugin-babel@latest/systemjs-babel-browser.js',
    'react': 'react@18.2.0/umd/react.production.min.js',
    'react-dom': 'react-dom@18.2.0/umd/react-dom.production.min.js',
  },
  transpiler: 'plugin-babel'
});

SystemJS.import('/src/App.js')
  .catch(console.error.bind(console));
