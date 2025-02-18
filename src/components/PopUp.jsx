import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './PopUp.css';

export default function PopupWrapper({ trigger, children }) {
  return (
    <Popup trigger={trigger} modal nested>
      {close => (
        <div>
          {children}
          {/* Optionally, add a close button here */}
          <button onClick={close}>Close</button>
        </div>
      )}
    </Popup>
  );
}