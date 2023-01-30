import React from 'react';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  return (
    <header className="header">
      <Navigation isLoggined={props.isLoggined}/>
    </header>
  );
}

export default Header;
