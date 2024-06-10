import NewsCardList from '../NewsCardList/NewsCardList.jsx';
import './SavedNews.css';

function SavedNews({
  isMobile = false,
  savedArticles,
  newsInARow,
  onChangeSavedArticles,
}) {
  return (
    <section className='savednews'>
      <NewsCardList
        isSavedNews={true}
        theNews={savedArticles}
        visibleNews={savedArticles.length}
        newsInARow={newsInARow}
        isMobile={isMobile}
        savedArticles={savedArticles}
        onChangeSavedArticles={onChangeSavedArticles}
        signedIn={true}
      />
    </section>
  );
}

export default SavedNews;
