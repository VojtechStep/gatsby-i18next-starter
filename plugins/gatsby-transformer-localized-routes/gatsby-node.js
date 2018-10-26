exports.onCreatePage = (
  { page, actions: { deletePage, createPage } },
  configOptions = {}
) => {
  if (page.path == '/dev-404-page/') {
    return;
  }
  if (!configOptions.langs.some(lang => page.path.startsWith(lang))) {
    console.log('Deleting', page.path);
    deletePage(page);
    configOptions.langs.forEach(lang => {
      const newPage = {
        ...page,
        path: `/${lang}${page.path}`,
        context: {
          ...page.context,
          lang,
          langs: configOptions.langs
        }
      };
      createPage(newPage);
    });
  }
};
