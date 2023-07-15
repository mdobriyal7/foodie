import React,{useEffect} from 'react';

import { useScreenState  } from '../features/stateSlice';

const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width }) => {
  const { resetState, initialState } = useScreenState();

useEffect(()=>console.log(initialState),[initialState])
  return (
    <button
      type="button"
      onClick={()=>resetState(initialState)}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
