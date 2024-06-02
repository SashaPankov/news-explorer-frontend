import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
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
  const isTabletSuperNarrow = useMediaQuery(
    'only screen and (min-width: 321px) and (max-width: 470px)'
  );
  const isTabletNarrow = useMediaQuery(
    'only screen and (min-width: 471px) and (max-width: 767px)'
  );
  const isSuperNarrow = useMediaQuery(
    'only screen and (min-width: 769px) and (max-width: 830px)'
  );
  const isNarrow = useMediaQuery(
    'only screen and (min-width: 831px) and (max-width: 1246px)'
  );
  const isBadInterval = useMediaQuery(
    'only screen and (min-width: 1232px) and (max-width: 1245px)'
  );
  const isDesktop = useMediaQuery('only screen and (min-width: 1246px)');
  const isDesktop1700 = useMediaQuery('only screen and (min-width: 1700px)');

  const noVSB = document.body.clientWidth === window.innerWidth;

  const getNewsInARow = () => {
    return isDesktop1700
      ? 4
      : isDesktop
      ? 3
      : isNarrow || isTabletNarrow
      ? noVSB && isBadInterval
        ? 3
        : 2
      : isSuperNarrow || isTabletSuperNarrow || isMobile
      ? 1
      : 1;
  };

  const getNewsDelta = () => {
    return isDesktop1700
      ? 4
      : isNarrow || isTabletNarrow
      ? noVSB && isBadInterval
        ? 3
        : 2
      : 3;
  };

  const [newsSection, setNewsSection] = useState({ visible: false, topic: '' });
  const visibleNewsCount = useRef(isNarrow ? (isBadInterval ? 3 : 2) : 3);
  const [visibleNews, setvisibleNews] = useState(visibleNewsCount.current);
  const [activePopup, setActivePopup] = useState('');
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);

  const [currentUser, setCurrentUser] = useState({});
  const [signedIn, setSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const ref = useRef();

  const [newsParams, setNewsParams] = useState({
    newsInARow: getNewsInARow(),
    moreNewsDelta: getNewsDelta(),
  });

  useEffect(() => {
    const initScrollbarWidthEvent = () => {
      const scrollbarEvent = new Event('scrollbar-width');
      let currentWidth = window.innerWidth - document.body.clientWidth;

      const observer = new ResizeObserver(() => {
        const newWidth = window.innerWidth - document.body.clientWidth;

        if (newWidth !== currentWidth) {
          scrollbarEvent.detail = {
            previous: currentWidth,
            current: newWidth,
          };
          currentWidth = newWidth;
          window.dispatchEvent(scrollbarEvent);
        }
      });

      observer.observe(document.body);
    };
    initScrollbarWidthEvent();

    function updateParams(event) {
      let noVSB;
      if (event) {
        if (event.type === 'scrollbar-width') {
          noVSB = event.detail.current === 0;
        } else {
          noVSB = window.innerWidth === document.body.clientWidth;
        }
      }

      // const noVSB = document.body.clientWidth === window.innerWidth;

      const checkMedia = (query) => {
        return window.matchMedia(query).matches;
      };

      const isMobile = checkMedia('only screen and (max-width: 320px)');
      const isTabletSuperNarrow = checkMedia(
        'only screen and (min-width: 321px) and (max-width: 470px)'
      );
      const isTabletNarrow = checkMedia(
        'only screen and (min-width: 471px) and (max-width: 767px)'
      );
      const isTablet = checkMedia(
        'only screen and (min-width: 768px) and (max-width: 768px)'
      );
      const isSuperNarrow = checkMedia(
        'only screen and (min-width: 769px) and (max-width: 830px)'
      );
      const isNarrow = checkMedia(
        'only screen and (min-width: 831px) and (max-width: 1246px)'
      );
      const isBadInterval = checkMedia(
        'only screen and (min-width: 1232px) and (max-width: 1245px)'
      );
      const isDesktop = checkMedia(
        'only screen and (min-width: 1246px) and (max-width: 1699px)'
      );
      const isDesktop1700 = checkMedia(
        'only screen and (min-width: 1700px) and (max-width: 2099px)'
      );
      const isDesktop2100 = checkMedia(
        'only screen and (min-width: 2100px) and (max-width: 2494px)'
      );
      const isDesktop2600 = checkMedia(
        'only screen and (min-width: 2495px) and (max-width: 2999px)'
      );
      const isDesktop3000 = checkMedia('only screen and (min-width: 3000px)');

      const getNewsInARow = () => {
        return isDesktop3000
          ? 7
          : isDesktop2600
          ? 6
          : isDesktop2100
          ? 5
          : isDesktop1700
          ? 4
          : isDesktop || isTablet
          ? 3
          : isNarrow || isTabletNarrow
          ? noVSB && isBadInterval
            ? 3
            : 2
          : isSuperNarrow || isTabletSuperNarrow || isMobile
          ? 1
          : 1;
      };

      const newsInARow_ = getNewsInARow();

      const getNewsDelta = () => {
        return isDesktop3000
          ? 7
          : isDesktop2600
          ? 6
          : isDesktop2100
          ? 5
          : isDesktop1700
          ? 4
          : isNarrow || isTabletNarrow
          ? noVSB && isBadInterval
            ? 3
            : 2
          : 3;
      };

      const moreNewsDelta_ = getNewsDelta();

      setNewsParams({ newsInARow: newsInARow_, moreNewsDelta: moreNewsDelta_ });

      if (!newsSection.visible) {
        let newVisibleNews = visibleNewsCount.current;

        if (visibleNewsCount.current % moreNewsDelta_ > 0) {
          newVisibleNews =
            visibleNewsCount.current +
            moreNewsDelta_ -
            (visibleNewsCount.current % moreNewsDelta_);
        }

        visibleNewsCount.current = newVisibleNews;
        setvisibleNews(newVisibleNews);
      }
    }

    updateParams();

    window.addEventListener('scrollbar-width', updateParams);
    window.addEventListener('resize', updateParams);
    return () => {
      window.removeEventListener('scrollbar-width', updateParams);
      window.removeEventListener('resize', updateParams);
    };
  }, [newsSection.visible]);

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
    visibleNewsCount.current = newsParams.moreNewsDelta;
    setvisibleNews(newsParams.moreNewsDelta);
  }

  const handleShowMoreNews = () => {
    const newVisibleNewsCount =
      visibleNewsCount.current + newsParams.moreNewsDelta > articles.length
        ? articles.length
        : visibleNewsCount.current + newsParams.moreNewsDelta;

    visibleNewsCount.current = newVisibleNewsCount;
    setvisibleNews(newVisibleNewsCount);
  };

  const handleUserSignin = (userSigninData) => {
    if (!Object.prototype.hasOwnProperty.call(userSigninData, 'userName')) {
      userSigninData['userName'] = 'Elise';
    }
    setCurrentUser(userSigninData);
    handleClosePopup();
    setSignedIn(true);
    ref.current.setState();
  };

  const handleUserSignup = () => {
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
            location.pathname !== '/'
              ? 'app__content app__content_signed_in'
              : 'app__content'
          }
        >
          <Header
            handleShowHideNews={handleShowHideNews}
            signedIn={signedIn}
            handleSignInOutClick={handleSignInOutClick}
            isMobile={isMobile}
            ref={ref}
            isActivePopup={activePopup != ''}
            isTabletSuperNarrow={isTabletSuperNarrow}
          />
          {!isLoading && (
            <Main
              handleHideNews={handleShowHideNews}
              handleTopicSearch={handleTopicSearch}
              searchTopic={newsSection.topic}
              newsInARow={newsParams.newsInARow}
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
            newsInARow={newsParams.newsInARow}
            isMobile={isMobile}
            onChangeSavedArticles={handleChangeSavedArticles}
            savedArticles={savedArticles}
          />
        )}
        {location.pathname === '/savednews' && (
          <SavedNews
            newsInARow={newsParams.newsInARow}
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
            onUserSignup={handleUserSignup}
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
