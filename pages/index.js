import Router from 'next/router';

const Home = () => null;

Home.getInitialProps = (context) => {
  // If process.browser === true you are in Client Side
  // If process.browser === false you are in Server Side

  const country = context.query.country || 'tr';

  if (process.browser) {
    Router.replace('/[country]', `/${country}`);
  } else {
    context.res.writeHead(302, { Location: `/${country}` });
  }

  context.res.end();
};

export default Home;
