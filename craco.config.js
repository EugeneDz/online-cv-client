const CracoLessPlugin = require('craco-less');
const antdVariables = require('./config/antdVariables.js');

module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        loader: 'less-loader'
      }
    ]
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        modifyVars: antdVariables,
        javascriptEnabled: true
      }
    }
  ],
  babel: {
    plugins: [
      [
        './node_modules/babel-plugin-module-resolver/lib/index.js',
        {
          root: ['./src'],
          alias: {
            components: './src/components',
            containers: './src/containers',
            hoc: './src/hoc',
            routes: './src/routes',
            config: './src/config',
            store: './src/store',
            views: './src/views',
            utils: './src/utils'
          }
        }
      ]
    ]
  }
};
