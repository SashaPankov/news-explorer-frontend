import { forwardRef, useState, useImperativeHandle } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import NavigationMobile from '../NavigationMobile/NavigationMobile';
import BottomBoard from '../BottomBoard/BottomBoard';
import './Header.css';

// eslint-disable-next-line react/display-name
const Header = forwardRef(function (
  {
    handleShowHideNews,
    signedIn,
    handleSignInOutClick,
    isActivePopup,
    isMobile,
    isTabletSuperNarrow,
  },
  ref
) {
  const location = useLocation();

  const getHeaderClassName = () => {
    if (isMobile && isActivePopup) {
      return 'header header_invisible';
    }
    return location.pathname !== '/'
      ? 'header header_nothome'
      : expandHeader
      ? 'header header_expanded'
      : 'header';
  };

  const [expandHeader, setExpandHeader] = useState(false);

  const handleExpandHeader = () => {
    setExpandHeader(isMobile && !expandHeader);
  };

  useImperativeHandle(ref, () => ({
    setState: () => handleExpandHeader(),
  }));

  return (
    <header className={getHeaderClassName()}>
      <h2 className='header__title'>
        News{signedIn && isTabletSuperNarrow ? ' ' : ''}Explorer
      </h2>
      {!isMobile && (
        <Navigation
          onShowHideNews={handleShowHideNews}
          signedIn={signedIn}
          onSignInOutClick={handleSignInOutClick}
        />
      )}
      {isMobile && (
        <NavigationMobile
          signedIn={signedIn}
          headerExpanded={expandHeader}
          onHeaderExpandClick={handleExpandHeader}
          onSignInOutClick={handleSignInOutClick}
          onShowHideNews={handleShowHideNews}
        />
      )}
      {isMobile && expandHeader && (
        <BottomBoard
          onSignInOutClick={handleSignInOutClick}
          onShowHideNews={handleShowHideNews}
          signedIn={signedIn}
        />
      )}
    </header>
  );
});

export default Header;
