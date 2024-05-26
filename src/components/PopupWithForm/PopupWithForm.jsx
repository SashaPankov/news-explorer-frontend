import { useContext } from 'react';
import { ServerRequestContext } from '../../contexts/ServerRequestContext';
import Popup from '../Popup/Popup';
import './PopupWithForm.css';

const noAction = 'No Action';

const PopupWithForm = ({
  children,
  title,
  name,
  onClose,
  buttonText = 'Add garment',
  onSubmit,
  actionButtonText = noAction,
  onDoSomeAction,
  buttonTextOnSubmit = 'Saving...',
  isSubmitDisabled = true,
  isMobile = false,
}) => {
  const { isLoading } = useContext(ServerRequestContext);

  const secondButtonClassName = `popup__button-action ${
    actionButtonText === noAction
      ? 'popup__button-action_hidden'
      : 'popup__button-action_visible'
  }`;

  const buttonClassName = isSubmitDisabled
    ? !isMobile
      ? 'popup__button-submit popup__button-submit_disabled'
      : 'popup__button-submit popup__button-submit_mobile popup__button-submit_disabled'
    : !isMobile
    ? 'popup__button-submit'
    : 'popup__button-submit popup__button-submit_mobile';

  return (
    <Popup name={name} onClose={onClose} isMobile={isMobile}>
      <h2 className={!isMobile ? 'popup__title' : 'popup__title_mobile'}>
        {title}
      </h2>
      <form className='popup__form' onSubmit={onSubmit}>
        {children}
        <div
          className={
            !isMobile
              ? 'popup__actions'
              : 'popup__actions popup__actions_mobile'
          }
        >
          <button
            type='submit'
            className={buttonClassName}
            disabled={isSubmitDisabled}
          >
            {isLoading ? buttonTextOnSubmit : buttonText}
          </button>
          <button
            type='button'
            className={secondButtonClassName}
            onClick={onDoSomeAction}
          >
            or <span className='popup__altaction'>{actionButtonText}</span>
          </button>
        </div>
      </form>
    </Popup>
  );
};

export default PopupWithForm;
