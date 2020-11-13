import { useState } from 'react';
import axios from 'axios';
import cookies from 'nookies';
import { useRouter } from 'next/router';
import Link from 'next/link';

import CustomInput from '../components/CustomInput';
import validateRequired from '../utils/validators/validateRequired';
import validateEmail from '../utils/validators/validateEmail';

const Signin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setError('Email and password have to be provided.');
      return;
    }

    try {
      const response = await axios.post(
        'https://iwallet-api.herokuapp.com/api/auth/signin',
        { ...credentials }
      );

      cookies.set(null, 'token', response.data.token, { path: '/' });

      const { plannedRoute } = cookies.get();
      const parsedPlannedRoute = plannedRoute && JSON.parse(plannedRoute);
      const plannedHrefRoute = parsedPlannedRoute
        ? parsedPlannedRoute.href
        : '/[country]';
      const plannedAsRoute = parsedPlannedRoute ? parsedPlannedRoute.as : '/tr';
      router.replace(plannedHrefRoute, plannedAsRoute);
    } catch (error) {
      setError(error.message);
    }
  };

  const onInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const renderError = () => {
    if (error) {
      return <div className="error">{error}</div>;
    }

    return null;
  };

  return (
    <div className="signin">
      <h3>Sign in Form</h3>
      <form onSubmit={onFormSubmit} autoComplete="off">
        <CustomInput
          type="email"
          name="email"
          placeholder="Enter your email"
          value={credentials.email}
          onChange={onInputChange}
          onBlur={validateEmail}
        />
        <CustomInput
          type="password"
          name="password"
          placeholder="Enter your password"
          value={credentials.password}
          onChange={onInputChange}
          onBlur={validateRequired}
        />
        {renderError()}
        <button type="submit">Submit</button>
      </form>
      <Link href="/signup">
        <a>Create an Account</a>
      </Link>
      <style jsx>{`
        .signin {
          width: 100vw;
          height: calc(100vh - 60px);
          display: flex;
          align-items: center;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export default Signin;
