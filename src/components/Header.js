import React from 'react';
import Theme from './Theme';

const Header = props => {
  return (
    <header>
      <h2 className="logo">QuizBuzz</h2>
      <Theme isDark={props.isDark} toggleTheme={props.toggleTheme} />
    </header>
  );
};

export default Header;