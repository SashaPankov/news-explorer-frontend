import { useState } from 'react';
import './NewsCard.css';

function NewsCard({
  card,
  onChangeSavedArticles,
  isCardSaved,
  isSavedView,
  isSavedNews = false,
  signedIn = false,
}) {
  const [cardSaved, setCardSaved] = useState(isCardSaved);

  const handleMarkChange = () => {
    onChangeSavedArticles(card, !cardSaved);
    if (!isSavedView) {
      setCardSaved(!cardSaved);
    }
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const datePublished = new Date(card.publishedAt);

  return (
    <li className={card.title ? 'newscard' : 'newscard newscard_transparent'}>
      <p className='newscard__keyword'>Keyword</p>
      <button
        className={
          cardSaved
            ? !isSavedNews
              ? 'newscard__mark newscard__marked'
              : 'newscard__mark newscard__trash'
            : 'newscard__mark'
        }
        onClick={handleMarkChange}
        disabled={!signedIn}
      ></button>
      {!signedIn && (
        <span className='newscard__mark-tooltip'>Sign in to save articles</span>
      )}
      <img src={card.urlToImage} alt={card.title} className='newscard__image' />
      <p className='newscard__publishedAt'>
        {card.publishedAt &&
          months[datePublished.getMonth()] +
            ' ' +
            datePublished.getDate() +
            ', ' +
            datePublished.getFullYear()}
      </p>
      <h2 className='newscard__title'>{card.title}</h2>
      <p className='newscard__description'>{card.description}</p>
      <p className='newscard__source'>{card.source.name}</p>
    </li>
  );
}

export default NewsCard;
