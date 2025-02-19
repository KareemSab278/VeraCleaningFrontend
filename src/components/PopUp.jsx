import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../css/PopUp.css';

export default function PopupWrapper({ trigger, children }) {
  return (
    <Popup trigger={trigger} modal nested>
      {close => (
        <div>
          {children}
          <button onClick={close}>Close</button>
        </div>
      )}
    </Popup>
  );
}