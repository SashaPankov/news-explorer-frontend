import NewsCardList from '../NewsCardList/NewsCardList.jsx';
import './SavedNews.css';

function SavedNews({
  isMobile = false,
  savedArticles,
  newsInARow,
  onChangeSavedArticles,
}) {
  return (
    <div className='savednews'>
      <NewsCardList
        isSavedNews={true}
        theNews={savedArticles}
        visibleNews={savedArticles.length}
        newsInARow={newsInARow}
        isMobile={isMobile}
        savedArticles={savedArticles}
        onChangeSavedArticles={onChangeSavedArticles}
      />
    </div>
  );
}

export default SavedNews;
