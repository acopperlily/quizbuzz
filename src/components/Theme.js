import React from "react";
import { useState } from "react";

const Theme = props => {
  // const [isChecked, setIsChecked] = useState(false);

  return (
    <form>
      <label htmlFor="theme">{props.isChecked ? 'Dark' : 'Light'}</label>
      <input
        type="checkbox"
        name="theme"
        id="theme"
        checked={props.isChecked}
        onChange={props.toggleTheme}
      />
    </form>
  );
}; 

export default Theme;