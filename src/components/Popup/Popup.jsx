import { useEffect } from 'react';
import './Popup.css';

const Popup = ({ name, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`popup popup_type_${name}`} onClick={handleOverlay}>
      <div className='popup__container'>
        {children}
        <button className='popup__close' type='button' onClick={onClose} />
      </div>
    </div>
  );
};

export default Popup;
