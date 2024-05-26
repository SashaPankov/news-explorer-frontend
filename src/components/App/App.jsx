import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import Header from '../Header/Header';
import Main from '../Main/Main';
import About from '../About/About';
import Footer from '../Footer/Footer';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import NewsCardList from '../NewsCardList/NewsCardList.jsx';
import SavedNews from '../SavedNews/SavedNews.jsx';
import SignInPopup from '../SignInPopup/SignInPopup';
import { getNewsByKeyword } from '../../utils/api.js';
import Preloader from '../Preloader/Preloader.jsx';

function App() {
  const location = useLocation();
  const isMobile = useMediaQuery('only screen and (max-width: 320px)');
  const isTablet = useMediaQuery(
    'only screen and (min-width: 321px) and (max-width: 768px)'
  );
  const isSuperNarrow = useMediaQuery(
    'only screen and (min-width: 769px) and (max-width: 830px)'
  );
  const isNarrow = useMediaQuery(
    'only screen and (min-width: 831px) and (max-width: 1246px)'
  );

  const newsInARow = isMobile || isSuperNarrow ? 1 : isNarrow ? 2 : 3;
  const moreNewsDelta = isNarrow ? 2 : 3;

  const [newsSection, setNewsSection] = useState({ visible: false, topic: '' });
  const [visibleNews, setvisibleNews] = useState(isNarrow ? 2 : 3);
  const [activePopup, setActivePopup] = useState('');
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);

  const [currentUser, setCurrentUser] = useState({});
  const [signedIn, setSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const ref = useRef();

  function handleShowHideNews(newsVisible) {
    setNewsSection({
      ...newsSection,
      visible: newsVisible && !(newsSection.topic === ''),
    });
    ref.current.setState();
  }

  function handleTopicSearch(searchTopic) {
    if (searchTopic) {
      setIsLoading(true);
      getNewsByKeyword(searchTopic)
        .then((data) => {
          setArticles(data.articles);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
    setNewsSection({
      ...newsSection,
      visible: !(searchTopic === ''),
      topic: searchTopic,
    });
    if (!newsSection.visible) {
      setvisibleNews(moreNewsDelta);
    }
  }

  const handleShowMoreNews = () => {
    setvisibleNews(
      visibleNews + moreNewsDelta > articles.length
        ? articles.length
        : visibleNews + moreNewsDelta
    );
  };

  const handleUserSignin = (userSigninData) => {
    if (!userSigninData.hasOwnProperty('userName')) {
      userSigninData['userName'] = 'Elise';
    }
    setCurrentUser(userSigninData);
    handleClosePopup();
    setSignedIn(true);
    ref.current.setState();
  };

  const handleUserSignup = (userCredentials) => {
    handleClosePopup();
    handleSignInClick();
  };

  const handleSignInOutClick = () => {
    if (signedIn) {
      navigate('/');
      setSignedIn(false);
      ref.current.setState();
    } else {
      setActivePopup('signin');
    }
  };

  const handleSignUpClick = () => {
    setActivePopup('signup');
  };

  const handleSignInClick = () => {
    setActivePopup('signin');
  };

  const handleClosePopup = () => {
    setActivePopup('');
  };

  const handleChangeSavedArticles = (card, save) => {
    let newSavedArticles = [...savedArticles];
    save
      ? newSavedArticles.push(card)
      : newSavedArticles.splice(newSavedArticles.indexOf(card), 1);
    setSavedArticles(newSavedArticles);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <div
          className={
            signedIn ? 'app__content app__content_signedin' : 'app__content'
          }
        >
          <Header
            handleShowHideNews={handleShowHideNews}
            signedIn={signedIn}
            handleSignInOutClick={handleSignInOutClick}
            isMobile={isMobile}
            ref={ref}
          />
          {!isLoading && (
            <Main
              handleHideNews={handleShowHideNews}
              handleTopicSearch={handleTopicSearch}
              searchTopic={newsSection.topic}
              newsInARow={newsInARow}
              isMobile={isMobile}
              signedIn={signedIn}
              savedArticlesCount={savedArticles.length}
            />
          )}
        </div>
        {isLoading && <Preloader />}
        {newsSection.visible && (
          <NewsCardList
            theNews={articles}
            onShowMoreNews={handleShowMoreNews}
            visibleNews={visibleNews}
            newsInARow={newsInARow}
            isMobile={isMobile}
            onChangeSavedArticles={handleChangeSavedArticles}
            savedArticles={savedArticles}
          />
        )}
        {location.pathname === '/savednews' && (
          <SavedNews
            newsInARow={newsInARow}
            savedArticles={savedArticles}
            onChangeSavedArticles={handleChangeSavedArticles}
          />
        )}
        {!(location.pathname === '/savednews') && <About />}
        <Footer isMobile={isMobile} />
        {activePopup === 'signin' && (
          <SignInPopup
            onCloseModal={handleClosePopup}
            onUserSignin={handleUserSignin}
            onUserSignUp={handleUserSignup}
            actionText='Sign up'
            onChangeToSignUp={handleSignUpClick}
            user={currentUser}
            isMobile={isMobile}
          />
        )}
        {activePopup === 'signup' && (
          <SignInPopup
            onCloseModal={handleClosePopup}
            onUserSignin={handleUserSignin}
            onUserSignup={handleUserSignup}
            actionText='Sign in'
            onChangeToSignIn={handleSignInClick}
            user={currentUser}
            isSignUp={true}
            isMobile={isMobile}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
