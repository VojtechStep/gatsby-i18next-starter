const { join } = require('path');
const localesConfig = require('./locales');

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-i18next',
      options: {
        localesPath: join(__dirname, 'locales/{{lng}}/{{ns}}.json'),
        namespaces: localesConfig.ns
      }
    },
    {
      resolve: 'gatsby-transformer-localized-routes',
      options: {
        langs: localesConfig.languages
      }
    }
  ]
};
