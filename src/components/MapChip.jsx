import React, { useState } from 'react';

import {
    MapChipPrimitive 
   } from '../ui-components';

function MapChip({ value }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [buttonState, setButtonState] = useState('Default');
  
    const handleMouseEnter = () => {
      setIsHovered(true);
      setButtonState('Hover');
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
      setButtonState(isPressed ? 'Pressed' : 'Default');
    };
  
  
    const handleMouseDown = () => {
     setIsPressed(!isPressed);
     setButtonState(isPressed ? 'Default' : 'Pressed');
   };
    return (
      <MapChipPrimitive 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
        onMouseDown={handleMouseDown} 
        state={buttonState}
        value = {value}  
        />
    )
  }
  
export default MapChip;