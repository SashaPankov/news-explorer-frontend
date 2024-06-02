import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './BottomBoard.css';
import logoutImg from '../../assets/logout.svg';
import logoutImgWhite from '../../assets/logout_white.svg';

const BottomBoard = ({
  signedIn = false,
  onSignInOutClick,
  onShowHideNews,
}) => {
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
        ? 'bottomboard__button bottomboard__button_nothome bottomboard__button_nothome_active'
        : 'bottomboard__button bottomboard__button_active'
      : !isHomePage()
      ? 'bottomboard__button bottomboard__button_nothome'
      : 'bottomboard__button';
  };

  return (
    <div
      className={
        isHomePage() ? 'bottomboard' : 'bottomboard bottomboard_nothome'
      }
    >
      <div className='bottomboard_navigation'>
        <button
          className={getButtonClassName('/')}
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
              ? 'bottomboard__button bottomboard__button-sign bottomboard__button-sign_in'
              : 'bottomboard__button bottomboard__button-sign bottomboard__button-sign_in bottomboard__button-sign_nothome'
            : isHomePage()
            ? 'bottomboard__button bottomboard__button-sign'
            : 'bottomboard__button bottomboard__button-sign bottomboard__button-sign_nothome'
        }
        onClick={onSignInOutClick}
      >
        {signedIn ? (
          <span className='bottomboard__username bottomboard__username_signed_in'>
            {currentUser.userName}
          </span>
        ) : (
          <span className='bottomboard__username'>Sign in</span>
        )}
        {signedIn && (
          <img
            className='bottomboard__signout'
            src={!isHomePage() ? logoutImg : logoutImgWhite}
            alt='Sign out'
          />
        )}
      </button>
    </div>
  );
};

export default BottomBoard;
