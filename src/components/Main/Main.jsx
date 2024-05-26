import { Routes, Route } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';
import Search from '../Search/Search';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './Main.css';

function Main({
  handleTopicSearch,
  searchTopic,
  isMobile,
  newsInARow,
  signedIn,
  savedArticlesCount,
}) {
  return (
    <div className='main'>
      <Routes>
        <Route path='*' element={<PageNotFound />} />

        <Route
          path='/'
          element={
            <Search
              onTopicSearch={handleTopicSearch}
              searchTopic={searchTopic}
              isMobile={isMobile}
            />
          }
        />

        <Route
          path='/savednews'
          element={
            <ProtectedRoute isSignedIn={signedIn}>
              <SavedNewsHeader
                onTopicSearch={handleTopicSearch}
                searchTopic={searchTopic}
                isMobile={isMobile}
                newsInARow={newsInARow}
                savedArticlesCount={savedArticlesCount}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default Main;
