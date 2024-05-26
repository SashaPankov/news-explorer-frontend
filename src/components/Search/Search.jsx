import { useEffect, useRef, useContext } from 'react';
import './Search.css';

function Search({ isMobile = false, onTopicSearch, searchTopic }) {
  const inputRef = useRef(null);

  const handleTopicEntered = () => {
    onTopicSearch(inputRef.current.value);
  };

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
    <div className='search'>
      <p className='search__title'>What's going on in the world?</p>
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
    </div>
  );
}

export default Search;
