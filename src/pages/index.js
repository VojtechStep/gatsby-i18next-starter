import React from 'react';
import { graphql } from 'gatsby';

export default ({ data }) => (
  <>
    <p>
      {JSON.stringify(data, null, 2)}
      Hello world, {data.sitePage.context.lang}, {data.i18n.hero}
    </p>
    <br />
    <p>Languages are {data.sitePage.context.langs}</p>
  </>
);

export const query = graphql`
  query {
    i18n(ns: "home") {
      hero: t(key: "hero")
    }
    sitePage {
      context {
        lang
        langs
      }
    }
  }
`;
