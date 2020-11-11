import '../styles/globals.scss';
import '../styles/ThumbnailWithSass.scss';

import React from 'react';
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Header />
      <Component {...pageProps} />

      <style jsx>{`
        :global(ul) {
          padding: 0;
          margin: 0;
          list-style-type: none;
        }
      `}</style>
    </React.Fragment>
  );
}

export default MyApp;
