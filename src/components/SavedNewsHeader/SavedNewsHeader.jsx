import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './SavedNewsHeader.css';

function SavedNewsHeader({ savedArticlesCount }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className='savednewsheader'>
      <h2 className='savednewsheader__title'>Saved articles</h2>
      <p className='savednewsheader__info'>
        {currentUser?.userName}, you have {savedArticlesCount} saved articles
      </p>
      <p className='savednewsheader__keywords'>
        {'By keywords: '}
        <span className='savednewsheader__keywords-list'>
          Nature, Yellowstone, and 2 other
        </span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
