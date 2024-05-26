import { useState } from 'react';
import './NewsCard.css';
import bookmarkImg from '../../assets/bookmark.svg';
import trashImg from '../../assets/trash.svg';

function NewsCard({ card, onChangeSavedArticles, isCardSaved, isSavedView }) {
  const [cardSaved, setCardSaved] = useState(isCardSaved);

  const handleMarkChange = () => {
    onChangeSavedArticles(card, !cardSaved);
    if (!isSavedView) {
      setCardSaved(!cardSaved);
    }
  };

  return (
    <li className={card.title ? 'newscard' : 'newscard newscard_transparent'}>
      <p className='newscard__keyword'>Keyword</p>
      <button className='newscard__mark' onClick={handleMarkChange}>
        <img
          className='newscard__markimage'
          src={!cardSaved ? bookmarkImg : trashImg}
        />
      </button>
      <img src={card.urlToImage} alt={card.title} className='newscard__image' />
      <p className='newscard__publishedAt'>
        {card.publishedAt &&
          new Intl.DateTimeFormat('en-GB', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            formatMatcher: 'best fit',
          }).format(new Date(card.publishedAt))}
      </p>
      <p className='newscard__title'>{card.title}</p>
      <p className='newscard__description'>{card.description}</p>
      <p className='newscard__source'>{card.source.name}</p>
    </li>
  );
}

export default NewsCard;
