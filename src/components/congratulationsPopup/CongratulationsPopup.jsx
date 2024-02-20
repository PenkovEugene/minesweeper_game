import React from 'react';
import './congratulationsPopup.css'

function CongratulationsPopup ({ show, onClose }) {
  if (!show) return null;

  return (
    <>
      <div className={`overlay ${show ? 'active' : ''}`} onClick={onClose}/>
      <div className={`congratulationsPopupWrapper ${show ? 'active' : ''}`} onClick={onClose}>
        <div className="popup">
          <h3>Congratulations! You've won the game!</h3>
          <p>Tap anywhere on the screen</p>
        </div>
      </div>
    </>
  );
};

export default CongratulationsPopup;
