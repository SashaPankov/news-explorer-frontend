import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './SavedNewsHeader.css';

function SavedNewsHeader({ savedArticlesCount }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className='savednewsheader'>
      <p className='savednewsheader__title'>Saved articles</p>
      <p className='savednewsheader__info'>
        {currentUser?.userName}, you have {savedArticlesCount} saved articles
      </p>
      <p className='savednewsheader__keywords'>
        {'By keywords: '}
        <span className='savednewsheader__keywords-list'>
          Nature, Yellowstone, and 2 other
        </span>
      </p>
    </div>
  );
}

export default SavedNewsHeader;
