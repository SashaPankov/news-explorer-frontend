import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../Popup/Popup';
import { useForm } from '../../hooks/useForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './BottomBoard.css';
import logoutImg from '../../assets/logout.svg';

const BottomBoard = ({
  onUserLogin,
  onChangeToSignUp,
  signedIn = false,
  onSignInOutClick,
  onShowHideNews,
}) => {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);

  const getButtonClassName = (path, isSignedIn) => {
    return location.pathname === path
      ? isSignedIn
        ? 'bottomboard__button bottomboard__button_signed_active'
        : 'bottomboard__button bottomboard__button_active'
      : isSignedIn
      ? 'bottomboard__button bottomboard__button_signed'
      : 'bottomboard__button';
  };

  return (
    <div
      className={!signedIn ? 'bottomboard' : 'bottomboard bottomboard_signed'}
    >
      <div className='bottomboard_navigation'>
        <button
          className={getButtonClassName('/', signedIn)}
          onClick={() => {
            onShowHideNews(true);
            navigate('/');
          }}
        >
          Home
        </button>
        {signedIn && (
          <button
            className={getButtonClassName('/savednews', signedIn)}
            onClick={() => {
              onShowHideNews(false);
              navigate('/savednews');
            }}
          >
            Saved articles
          </button>
        )}
      </div>
      <button
        className={
          signedIn
            ? 'bottomboard__button bottomboard__button-sign bottomboard__button-sign_in'
            : 'bottomboard__button bottomboard__button-sign'
        }
        onClick={onSignInOutClick}
      >
        {signedIn ? currentUser.userName : 'Sign in'}
        {signedIn && <img className='bottomboard__signout' src={logoutImg} />}
      </button>
    </div>
  );
};

export default BottomBoard;
