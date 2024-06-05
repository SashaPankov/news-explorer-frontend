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
}) => {
  const { isLoading } = useContext(ServerRequestContext);

  const secondButtonClassName = `popup__button-action ${
    actionButtonText === noAction
      ? 'popup__button-action_hidden'
      : 'popup__button-action_visible'
  }`;

  const buttonClassName = isSubmitDisabled
    ? 'popup__button-submit popup__button-submit_disabled'
    : 'popup__button-submit';

  return (
    <Popup name={name} onClose={onClose}>
      <h2 className='popup__title'>{title}</h2>
      <form className='popup__form' onSubmit={onSubmit}>
        {children}
        <div className='popup__actions'>
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
