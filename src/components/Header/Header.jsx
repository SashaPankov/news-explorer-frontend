import { forwardRef, useState, useImperativeHandle } from 'react';
import Navigation from '../Navigation/Navigation';
import NavigationMobile from '../NavigationMobile/NavigationMobile';
import BottomBoard from '../BottomBoard/BottomBoard';
import './Header.css';

const Header = forwardRef(function (
  { handleShowHideNews, signedIn, handleSignInOutClick, isMobile },
  ref
) {
  const getHeadrClassName = () => {
    return signedIn
      ? isMobile
        ? 'header header_signedin header_mobile'
        : 'header header_signedin'
      : isMobile
      ? expandHeader
        ? 'header header_mobile header_mobile_expanded'
        : 'header header_mobile'
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
    <header className={getHeadrClassName()}>
      <p className='header__title'>NewsExplorer</p>
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
