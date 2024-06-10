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
import RegisteredPopup from '../RegisteredPopup/RegisteredPopup';
import {
  getNewsByKeyword,
  getSavedArticles,
  saveArticle,
  deleteArticle,
} from '../../utils/api.js';
import Preloader from '../Preloader/Preloader.jsx';
import { signup, signin, getContent } from '../../utils/auth.js';

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

  const noVSB = document.body.clientWidth === window.innerWidth;

  const getNewsInARow = () => {
    return isDesktop
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
    return isNarrow || isTabletNarrow ? (noVSB && isBadInterval ? 3 : 2) : 3;
  };

  const [newsSection, setNewsSection] = useState({ visible: false, topic: '' });
  const visibleNewsCount = useRef(isNarrow ? (isBadInterval ? 3 : 2) : 3);
  const [visibleNews, setvisibleNews] = useState(visibleNewsCount.current);
  const [activePopup, setActivePopup] = useState('');
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);

  const [signedIn, setSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
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
      const isDesktop = checkMedia('only screen and (min-width: 1246px)');
      const isBadInterval = checkMedia(
        'only screen and (min-width: 1232px) and (max-width: 1245px)'
      );

      const getNewsInARow = () => {
        return isDesktop || isTablet
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
        return isNarrow || isTabletNarrow
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

  const [nothingFound, setNothingFound] = useState(false);
  const [searchError, setSearchError] = useState(false);

  function handleTopicSearch(searchTopic) {
    let somethingFound = false;
    let searchError = false;
    if (searchTopic) {
      setNothingFound(false);
      setIsLoading(true);
      getNewsByKeyword(searchTopic)
        .then((data) => {
          data.articles.forEach((article) => (article.keyword = searchTopic));
          setArticles(data.articles);
          somethingFound = data.articles.length > 0;
        })
        .catch(() => {
          console.error;
          searchError = true;
        })
        .finally(() => {
          setNewsSection({
            ...newsSection,
            visible: somethingFound, //!(searchTopic === ''),
            topic: searchTopic,
          });
          setNothingFound(!somethingFound);
          setSearchError(searchError);
          setIsLoading(false);
        });
    } else {
      window.alert('Please enter a keyword');
    }
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

  function handleSubmit(request, postEvent) {
    setIsLoading(true);
    request()
      .then((data) => {
        handleClosePopup();
        postEvent(data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      })
      .finally(() => setIsLoading(false));
  }

  const loadSavedArticles = () => {
    let newSavedArticles = [];
    const fillSavedArticles = (dbArticles) => {
      newSavedArticles = dbArticles.map((dbArticle) => ({
        title: dbArticle.title,
        publishedAt: dbArticle.date,
        description: dbArticle.text,
        source: { id: '', name: dbArticle.source },
        urlToImage: dbArticle.image,
        keyword: dbArticle.keyword,
        _id: dbArticle._id,
      }));
    };

    getSavedArticles()
      .then((response) => {
        fillSavedArticles(response.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      })
      .finally(() => {
        setSavedArticles(newSavedArticles);
      });
  };

  const handleUserSignin = (userSigninData) => {
    const saveUser = (user) => {
      if (user.token) {
        localStorage.setItem('jwt', user.token);
        getContent(user.token)
          .then((user_1) => {
            if (user_1) {
              setCurrentUser(user_1.data);
              setSignedIn(true);
              ref.current.setState();
              loadSavedArticles();
              const redirectPath = location.state?.from?.pathname || '/ducks';
              navigate(redirectPath);
            }
          })
          .catch(console.error);
      }
    };

    const makeRequest = () => {
      return signin(userSigninData);
    };

    handleSubmit(makeRequest, saveUser);
  };

  const handleUserSignup = (userCredentials) => {
    const showRegisteredPopup = () => {
      setActivePopup('registered');
    };

    const makeRequest = () => {
      return signup(userCredentials);
    };

    handleSubmit(makeRequest, showRegisteredPopup);
  };

  const handleSignInOutClick = () => {
    if (signedIn) {
      const token = localStorage.getItem('jwt');
      if (token) {
        navigate('/');
        localStorage.removeItem('jwt');
        setCurrentUser({});
        setSignedIn(false);
        setSavedArticles([]);
        ref.current.setState();
      }
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
    const renderCards = (article) => {
      let newSavedArticles = [...savedArticles];

      const saveArticleAtClient = () => {
        const { _id } = article.data;
        card._id = _id;
        card.keyword = newsSection.topic;
        newSavedArticles.unshift(card);
      };

      save
        ? saveArticleAtClient()
        : newSavedArticles.splice(newSavedArticles.indexOf(card), 1);
      setSavedArticles(newSavedArticles);
    };

    const makeSaveRequest = () => {
      return saveArticle(card, newsSection.topic);
    };

    const makeDeleteRequest = () => {
      return deleteArticle(card);
    };

    save
      ? handleSubmit(makeSaveRequest, renderCards)
      : handleSubmit(makeDeleteRequest, renderCards);
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      getContent(token)
        .then((user) => {
          if (user) {
            setCurrentUser(user.data);
            setSignedIn(true);
            loadSavedArticles();
          }
        })
        .catch(console.error);
    }
  }, []);

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
          {/* {!isLoading && ( */}
          <Main
            handleHideNews={handleShowHideNews}
            handleTopicSearch={handleTopicSearch}
            searchTopic={newsSection.topic}
            newsInARow={newsParams.newsInARow}
            isMobile={isMobile}
            signedIn={signedIn}
            savedArticlesCount={savedArticles.length}
            savedArticles={savedArticles}
          />
          {/* )} */}
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
            onSignIn={handleSignInOutClick}
            savedArticles={savedArticles}
            signedIn={signedIn}
          />
        )}
        {location.pathname === '/' && nothingFound && (
          <Preloader nothingFound={nothingFound} />
        )}
        {location.pathname === '/' && searchError && (
          <Preloader searchError={searchError} />
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
        {activePopup === 'registered' && (
          <RegisteredPopup
            onCloseModal={handleClosePopup}
            onChangeToSignIn={handleSignInClick}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
