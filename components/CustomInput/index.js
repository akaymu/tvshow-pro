import { useState } from 'react';

const CustomInput = ({
  type = 'text',
  name,
  placeholder = '',
  value,
  onChange = () => {},
  onBlur = () => {},
}) => {
  const [error, setError] = useState('');

  const validationCheck = (text) => {
    const isValid = onBlur && onBlur(text);
    isValid ? setError('') : setError(`Invalid ${name}`);
  };

  const onInputBlur = () => {
    validationCheck(value);
  };

  const onInputChange = (event) => {
    validationCheck(event.target.value);
    onChange(event);
  };

  const renderError = () => {
    if (error) {
      return <div className="error">{error}</div>;
    }

    return null;
  };

  return (
    <div className="custom-input">
      <input
        type={type} // text, email or password
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
        onBlur={onInputBlur}
      />
      {renderError()}
    </div>
  );
};

export default CustomInput;
