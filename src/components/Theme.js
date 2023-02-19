import React from "react";
import { useState } from "react";
import { FaSun, FaMoon } from 'react-icons/fa';

const Theme = props => {
  // const [isChecked, setIsChecked] = useState(false);

  return (
    <form className="toggleTheme">
      <label htmlFor="theme">
        {props.isDark ? <FaMoon /> : <FaSun />}</label>
      <input
        type="checkbox"
        name="theme"
        id="theme"
        checked={props.isDark}
        onChange={props.toggleTheme}
      />
    </form>
  );
}; 

export default Theme;