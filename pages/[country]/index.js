import axios from 'axios';
import cookies from 'nookies';

import Thumbnail from '../../components/Thumbnail';
import Error from 'next/error';
// import Thumbnail from '../../components/ThumbnailWithSass';

const Home = (props) => {
  if (props.statusCode) {
    return <Error statusCode={props.statusCode} />;
  }
  const renderShows = () => {
    return props.shows.map((showItem, index) => {
      const { show } = showItem;
      return (
        <li key={index}>
          <Thumbnail
            imageUrl={(show.image && show.image.medium) || undefined}
            caption={show.name}
            href="/[country]/[showId]"
            as={`/${props.country}/${show.id}`}
          />
        </li>
      );
    });
  };

  return (
    <div>
      <ul className="tvshows">{renderShows()}</ul>
      <style jsx>{`
        .tvshows {
          display: flex;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
};

Home.getInitialProps = async (context) => {
  try {
    const { defaultCountry } = cookies.get(context);
    const country = context.query.country || defaultCountry || 'tr';
    // const country = context.query.country || 'tr';
    const response = await axios.get(
      `https://api.tvmaze.com/schedule?country=${country}&date=${formatDate()}`
    );
    return {
      shows: response.data,
      country,
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
    };
  }
};

const formatDate = () => {
  var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export default Home;
