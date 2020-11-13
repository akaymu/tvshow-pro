import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import cookies from 'nookies';
import Link from 'next/link';
import { isAuthenticated } from '../../utils/withAuthorization';

const countries = [
  { code: 'ar', name: 'Argentina' },
  { code: 'br', name: 'Brazil' },
  { code: 'ca', name: 'Canada' },
  { code: 'fr', name: 'France' },
  { code: 'jp', name: 'Japan' },
  { code: 'es', name: 'Spain' },
  { code: 'tr', name: 'Turkey' },
  { code: 'gb', name: 'United Kingdom of Great Britain and Northern Ireland' },
  { code: 'us', name: 'United States of America' },
];

const Header = () => {
  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState(
    router.query.country || 'tr'
  );

  const onSelectChange = (e) => {
    setSelectedCountry(e.target.value);
    router.push('/[country]', `/${e.target.value}`);
  };

  const renderCountries = () => {
    return countries.map((c) => (
      <option key={c.code} value={c.code}>
        {c.name}
      </option>
    ));
  };

  const onSignoutClick = () => {
    cookies.destroy(null, 'token');
  };

  const renderSignoutLink = () => {
    if (isAuthenticated()) {
      return (
        <Link href="/[country]" as={`/${selectedCountry}`}>
          <a onClick={onSignoutClick}>Signout</a>
        </Link>
      );
    }
    return (
      <div className="authentication-links">
        <Link href="/signin">
          <a>Signin</a>
        </Link>
        <Link href="/signup">
          <a>Signup</a>
        </Link>
      </div>
    );
  };

  useEffect(() => {
    cookies.set(null, 'defaultCountry', selectedCountry, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  }, [selectedCountry]);

  return (
    <div className="header">
      <select value={selectedCountry} onChange={onSelectChange}>
        {renderCountries()}
      </select>

      {renderSignoutLink()}
      <style jsx>{`
        .header {
          padding: 20px;
          background-color: #333;
          color: #fff;
          text-align: center;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default Header;
