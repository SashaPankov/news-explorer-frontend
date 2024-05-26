import { Link } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  return (
    <div className='not-found'>
      <h3 className='not-found__title'>
        <span>404</span> - Page Not Found!
      </h3>
      <p className='not-found__text'>
        Uh oh! There&apos;s nothing here... Sorry. 🥺
      </p>
      <Link to='/' className='not-found__link'>
        Return to start page
      </Link>
    </div>
  );
}

export default PageNotFound;
