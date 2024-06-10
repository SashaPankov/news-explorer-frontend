import './RegisteredPopup.css';
import Popup from '../Popup/Popup';

const RegisteredPopup = ({ onCloseModal, onChangeToSignIn }) => {
  function handleSignIn() {
    onChangeToSignIn();
  }

  return (
    <Popup name={name} onClose={onCloseModal}>
      <h2 className='registered__title'>
        Registration successfully completed!
      </h2>
      <button
        type='button'
        className='registered__signinbutton'
        onClick={handleSignIn}
      >
        <span className='registered__signintext'>Sign in</span>
      </button>
    </Popup>
  );
};

export default RegisteredPopup;
