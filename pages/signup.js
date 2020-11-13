import { useState } from 'react';
import axios from 'axios';
import cookies from 'nookies';
import { useRouter } from 'next/router';
import Link from 'next/link';

import CustomInput from '../components/CustomInput';
import validateRequired from '../utils/validators/validateRequired';
import validateEmail from '../utils/validators/validateEmail';

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.name || !credentials.email || !credentials.password) {
      setError('Name, Email and password have to be provided.');
      return;
    }

    try {
      const response = await axios.post(
        'https://iwallet-api.herokuapp.com/api/auth/signup',
        { ...credentials }
      );

      cookies.set(null, 'token', response.data.token, { path: '/' });
      router.replace('/[country]', '/tr');
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
    <div className="signup">
      <h3>Sign up Form</h3>
      <form onSubmit={onFormSubmit} autoComplete="off">
        <CustomInput
          type="text"
          name="name"
          placeholder="Enter your name"
          value={credentials.name}
          onChange={onInputChange}
          onBlur={validateRequired}
        />
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
      <Link href="/signin">
        <a>Already has an account</a>
      </Link>
      <style jsx>{`
        .signup {
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

export default Signup;
