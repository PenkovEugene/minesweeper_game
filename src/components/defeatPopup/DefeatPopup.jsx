import React from 'react';
import './defeatPopup.css'

function DefeatPopup ({ show, onClose }) {
  if (!show) return null;
  return (
    <>
      <div className={`overlay ${show ? 'active' : ''}`} onClick={onClose}/>
      <div className={`defeatPopupWrapper ${show ? 'active' : ''}`} onClick={onClose}>
        <div className="popup">
          <h3>Ups... Game Over!</h3> 
          <h3>Time has expired or you've hit a mine.</h3>
          <p>Tap anywhere on the screen</p>
        </div>
      </div>
    </>
  );
  
}

export default DefeatPopup;
