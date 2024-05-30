import { useState } from 'react';
import './NewsCard.css';

function NewsCard({
  card,
  onChangeSavedArticles,
  isCardSaved,
  isSavedView,
  isSavedNews = false,
}) {
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
      <button
        className={
          cardSaved
            ? !isSavedNews
              ? 'newscard__mark newscard__marked'
              : 'newscard__mark newscard__trash'
            : 'newscard__mark'
        }
        onClick={handleMarkChange}
      ></button>
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
      <h2 className='newscard__title'>{card.title}</h2>
      <p className='newscard__description'>{card.description}</p>
      <p className='newscard__source'>{card.source.name}</p>
    </li>
  );
}

export default NewsCard;
