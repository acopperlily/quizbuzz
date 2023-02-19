import React from "react";
import { useState, useEffect } from 'react';
import Confetti from "react-confetti";

export default () => {
  const [size, setSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  });

  return (
    <Confetti
      numberOfPieces={2500}
      recycle={false}
      gravity={0.03}
      friction={1}
      opacity={0.8}
      width={size.width}
      height={size.height}
    />
  );
};