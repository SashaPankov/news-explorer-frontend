import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import { emptyCard } from '../../utils/constants.js';

function NewsCardList({
  theNews,
  onShowMoreNews,
  visibleNews,
  newsInARow,
  isSavedNews = false,
  onChangeSavedArticles,
  savedArticles,
  signedIn = false,
}) {
  const visibleArticles = theNews.slice(0, visibleNews);

  for (let i = 0; i < visibleArticles.length % newsInARow; i++) {
    visibleArticles.push(structuredClone(emptyCard));
  }

  const handleShowMore = () => {
    onShowMoreNews();
  };

  return (
    <section className='news'>
      {!isSavedNews && <p className='news__caption'>Search results</p>}
      {visibleArticles.length > 0 && (
        <ul className='news__cards'>
          {visibleArticles.map((card, key) => (
            <NewsCard
              card={card}
              key={key}
              onChangeSavedArticles={onChangeSavedArticles}
              isCardSaved={savedArticles.indexOf(card) !== -1}
              isSavedView={theNews === savedArticles}
              isSavedNews={isSavedNews}
              signedIn={signedIn}
            />
          ))}
        </ul>
      )}
      {!isSavedNews &&
        theNews.length > 0 &&
        visibleArticles.length < theNews.length && (
          <button className='news__showmore' onClick={handleShowMore}>
            Show more
          </button>
        )}
    </section>
  );
}

export default NewsCardList;
