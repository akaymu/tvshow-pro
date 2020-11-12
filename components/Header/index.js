import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import cookies from 'nookies';

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

  const [selectedCountry, setSelectedCountry] = useState(router.query.country);

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
      <style jsx>{`
        .header {
          padding: 20px;
          background-color: #333;
          color: #fff;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Header;
