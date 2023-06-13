import React, { useState } from 'react';

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openPopup}>Open Popup</button>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Popup Content</h2>
            <p>This is the content of the popup.</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
