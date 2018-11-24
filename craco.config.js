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
  ]
};
