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
        @font-face {
          font-family: 'raleway';
          src: url('/fonts/raleway/Raleway-Regular.ttf') format('truetype');
        }

        :global(html) {
          font-family: 'raleway';
        }

        :global(ul) {
          padding: 0;
          margin: 0;
          list-style-type: none;
        }

        :global(form) {
          display: flex;
          width: 100%;
          flex-direction: column;
          text-align: center;
          padding: 10px;
          max-width: 600px;
        }

        :global(input) {
          margin-top: 10px;
          padding: 10px;
          width: 100%;
          box-sizing: border-box;
        }

        :global(button) {
          padding: 10px;
          margin-top: 10px;
          cursor: pointer;
          background-color: #f57927;
          color: white;
          border-color: transparent;
        }

        :global(button:hover) {
          background-color: #e8633f;
        }

        :global(.error) {
          color: red;
          padding-bottom: 10px;
          text-align: left;
        }

        :global(a) {
          margin-left: 10px;
        }

        :global(a:hover) {
          color: #e8633f;
        }
      `}</style>
    </React.Fragment>
  );
}

export default MyApp;
