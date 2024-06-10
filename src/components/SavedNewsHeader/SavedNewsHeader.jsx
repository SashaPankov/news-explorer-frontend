import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './SavedNewsHeader.css';

function SavedNewsHeader({ savedArticlesCount, savedArticles }) {
  const currentUser = useContext(CurrentUserContext);
  const keywords = savedArticles.map(function (article) {
    return article['keyword'];
  });
  const uniqueKeywords = new Set(keywords);

  let i = 0;
  let keywordList = '';
  for (const uniqueKeyword of uniqueKeywords) {
    keywordList = keywordList + uniqueKeyword + ', ';
    i++;
    if (i === 2) break;
  }
  if (keywordList.length > 0) {
    keywordList = keywordList.substring(0, keywordList.length - 2); //deleting unnecessary ", " at the end
  }

  const other = uniqueKeywords.size - 2;
  if (other > 0) {
    keywordList = `${keywordList} and ${other} other`;
  }

  return (
    <section className='savednewsheader'>
      <h2 className='savednewsheader__title'>Saved articles</h2>
      <p className='savednewsheader__info'>
        {currentUser?.name}, you have {savedArticlesCount} saved articles
      </p>
      <p className='savednewsheader__keywords'>
        {'By keywords: '}
        <span className='savednewsheader__keywords-list'>{keywordList}</span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
