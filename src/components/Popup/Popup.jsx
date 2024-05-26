import { useEffect } from 'react';
import './Popup.css';

const Popup = ({ name, onClose, children, isMobile = false }) => {
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
    <div
      className={
        !isMobile
          ? `popup popup_type_${name}`
          : `popup popup_mobile popup_type_${name}`
      }
      onClick={handleOverlay}
    >
      <div
        className={
          !isMobile
            ? 'popup__container'
            : 'popup__container popup__container_mobile'
        }
      >
        {children}
        <button className='popup__close' type='button' onClick={onClose} />
      </div>
    </div>
  );
};

export default Popup;
