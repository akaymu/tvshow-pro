import Link from 'next/link';

const Thumbnail = ({
  imageUrl = 'https://via.placeholder.com/210x295?text=?',
  caption,
  href = '',
  as = '',
  small = false,
}) => {
  return (
    <div className="thumbnail">
      {!href && !as ? (
        <>
          <img src={imageUrl} alt={caption} className="thumbnail__image" />
          <h4 className="thumbnail__caption">{caption}</h4>
        </>
      ) : (
        <Link href={href} as={as}>
          <a>
            <img src={imageUrl} alt={caption} className="thumbnail__image" />
            <h4 className="thumbnail__caption">{caption}</h4>
          </a>
        </Link>
      )}

      <style jsx>{`
        .thumbnail {
          margin: 0 10px;
          max-width: 210px;
        }
        .thumbnail__image {
          width: ${small ? '100px' : '100%'};
        }
        .thumbnail__caption {
          text-align: center;
          padding: 0;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default Thumbnail;
