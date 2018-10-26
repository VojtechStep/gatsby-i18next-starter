const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} = require('gatsby/graphql');

const i18next = require('i18next');
const i18nextBackend = require('i18next-node-fs-backend');

exports.onPreInit = (
  { actions: { addThirdPartySchema } },
  configOptions = {}
) => {
  addThirdPartySchema({
    schema: new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
          i18n: {
            type: new GraphQLObjectType({
              name: 'I18nextProvider',
              fields: () => ({
                t: {
                  type: GraphQLString,
                  args: { key: { type: GraphQLNonNull(GraphQLString) } },
                  resolve: ({ i18n, ns }, { key }) => {
                    return i18n.getFixedT(null, ns)(key);
                  }
                }
              })
            }),
            args: {
              lang: { type: GraphQLString },
              ns: { type: GraphQLString }
            },
            resolve: (_, { lang, ns }, context) =>
              new Promise((resolve, reject) => {
                if (context.context) {
                  if (
                    typeof lang == 'undefined' &&
                    typeof context.context.lang != 'undefined'
                  ) {
                    lang = context.context.lang;
                  }
                }
                if (typeof lang == 'undefined') {
                  throw new TypeError(
                    'Lang must be specified (either by page context or field argument)'
                  );
                }
                const i18n = i18next
                  .createInstance({
                    load: 'languageOnly',
                    fallbackLng: 'en',
                    ...configOptions.i18nextOptions,
                    lng: lang,
                    ns: configOptions.namespaces,
                    backend: {
                      loadPath: configOptions.localesPath
                    }
                  })
                  .use(i18nextBackend)
                  .init(err => {
                    if (err) {
                      return reject(err);
                    }
                    resolve(i18n);
                  });
              }).then(i18n => ({
                i18n,
                ns
              }))
          }
        })
      })
    })
  });
};
