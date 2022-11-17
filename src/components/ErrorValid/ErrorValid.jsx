import React from 'react';

function ErrorValid(props) {

  return (
    <p className="form__error">{props.error.message}</p>
  );
}

export default ErrorValid;