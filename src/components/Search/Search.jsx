import { useEffect, useRef, useCallback } from 'react';
import './Search.css';

function Search({ isMobile = false, onTopicSearch, searchTopic }) {
  const inputRef = useRef(null);

  const handleTopicEntered = useCallback(() => {
    onTopicSearch(inputRef.current.value);
  }, [onTopicSearch]);

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === 'Enter') {
        handleTopicEntered();
      }
    };

    document.addEventListener('keydown', handleEnter);
    return () => document.removeEventListener('keydown', handleEnter);
  }, [handleTopicEntered]);

  return (
    <section className='search'>
      <h2 className='search__title'>What&apos;s going on in the world?</h2>
      <p className='search__description'>
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <div className='search__field'>
        <input
          type='search'
          name='topic'
          className='search__topic'
          placeholder='Enter topic'
          ref={inputRef}
          defaultValue={searchTopic}
        />
        {!isMobile && (
          <button className='search__button' onClick={handleTopicEntered}>
            Search
          </button>
        )}
      </div>
      {isMobile && (
        <button className='search__button' onClick={handleTopicEntered}>
          Search
        </button>
      )}
    </section>
  );
}

export default Search;
