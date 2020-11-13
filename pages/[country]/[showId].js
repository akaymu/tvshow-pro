import axios from 'axios';
import parse from 'html-react-parser';
import Error from 'next/error';

import Cast from '../../components/Cast';
import { withAuthorization } from '../../utils/withAuthorization';

const ShowDetails = ({ show = {}, statusCode }) => {
  const { name, image, summary, _embedded } = show;
  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <div className="show-details">
      <div
        className="show-details__poster"
        style={{
          backgroundImage: `url(${image.original})`,
        }}
      ></div>
      <h1>{name}</h1>
      {(summary && parse(summary)) || null}
      {_embedded.cast.length > 0 && <Cast cast={_embedded.cast} />}

      <style jsx>{`
        .show-details__poster {
          height: 80vh;
          background-size: cover;
        }
      `}</style>
    </div>
  );
};

ShowDetails.getInitialProps = async (context) => {
  try {
    const id = context.query.showId;
    const response = await axios.get(
      `https://api.tvmaze.com/shows/${id}?embed=cast`
    );
    return {
      show: response.data,
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
    };
  }
};

export default withAuthorization(ShowDetails);
