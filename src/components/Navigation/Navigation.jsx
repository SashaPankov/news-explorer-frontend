import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import logoutImg from '../../assets/logout.svg';
import logoutImgWhite from '../../assets/logout_white.svg';
import './Navigation.css';

function Navigation({ onShowHideNews, signedIn = false, onSignInOutClick }) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);

  const location = useLocation();

  const isHomePage = () => {
    return location.pathname === '/';
  };

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  const getButtonClassName = (path) => {
    return isCurrentPath(path)
      ? !isHomePage()
        ? 'navigation__button navigation__button_nothome navigation__button_nothome_active'
        : 'navigation__button navigation__button_active'
      : !isHomePage()
      ? 'navigation__button navigation__button_nothome'
      : 'navigation__button';
  };

  return (
    <div
      className={!isHomePage() ? 'navigation navigation_nothome' : 'navigation'}
    >
      <div
        className={
          !signedIn
            ? 'navigation__buttonswrapper'
            : 'navigation__buttonswrapper navigation__buttonswrapper_signed_in'
        }
      >
        <button
          className={
            getButtonClassName('/') +
            (!signedIn ? ' navigation__button_notsigned' : '')
          }
          onClick={() => {
            onShowHideNews(true);
            navigate('/');
          }}
        >
          Home
        </button>
        {signedIn && (
          <button
            className={getButtonClassName('/savednews')}
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
            ? isHomePage()
              ? 'navigation__button navigation__button-signin navigation__button-signin_signed_in'
              : 'navigation__button navigation__button-signin navigation__button-signin_signed_in navigation__button-signin_nothome'
            : isHomePage()
            ? 'navigation__button navigation__button-signin'
            : 'navigation__button navigation__button-signin navigation__button-signin_nothome'
        }
        onClick={onSignInOutClick}
      >
        {signedIn ? (
          <span className='navigation__username navigation__username_signed_in'>
            {currentUser.userName}
          </span>
        ) : (
          <span className='navigation__username'>Sign in</span>
        )}
        {signedIn && (
          <img
            className='navigation__signout'
            src={!isHomePage() ? logoutImg : logoutImgWhite}
          />
        )}
      </button>
    </div>
  );
}

export default Navigation;
