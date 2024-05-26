import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import logoutImg from '../../assets/logout.svg';
import './Navigation.css';

function Navigation({ onShowHideNews, signedIn = false, onSignInOutClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = useContext(CurrentUserContext);

  const getButtonClassName = (path, isSignedIn) => {
    return location.pathname === path
      ? isSignedIn
        ? 'navigation__button navigation__button_signed_active'
        : 'navigation__button navigation__button_active'
      : isSignedIn
      ? 'navigation__button navigation__button_signed'
      : 'navigation__button';
  };

  return (
    <div className={signedIn ? 'navigation navigation_signedin' : 'navigation'}>
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
      <button
        className={
          signedIn
            ? 'navigation__button-signin navigation__button-signin_signedin'
            : 'navigation__button navigation__button-signin'
        }
        onClick={onSignInOutClick}
      >
        {signedIn ? currentUser.userName : 'Sign in'}
        {signedIn && <img className='navigation__signout' src={logoutImg} />}
      </button>
    </div>
  );
}

export default Navigation;
