import { NavLink } from 'react-router-dom';
import './Footer.css';
import faceBookLogo from '../../assets/fb.svg';
import gitHubLogo from '../../assets/github.svg';

const navClassName = ({ isActive }) =>
  'footer__ref' + (isActive ? ' footer__ref_active' : '');

function Footer({ isMobile = false }) {
  return (
    <footer className='footer'>
      {!isMobile && (
        <p className='footer__copyright'>
          © Sasha Pankov, Powered by{' '}
          <a
            className='footer__ref'
            href='https://newsapi.org/'
            target='_blank'
          >
            News API
          </a>
        </p>
      )}
      <div className='footer__links-wrapper'>
        <ul className='footer__links'>
          <li className='footer__link'>
            <NavLink to='/' className={navClassName}>
              Home
            </NavLink>
          </li>
          <li className='footer__link'>
            <a
              href='https://tripleten.com/'
              target='_blank'
              className='footer__ref'
            >
              TripleTen
            </a>
          </li>
        </ul>
        <div className='footer__logos-wrapper'>
          <div className='footer__github'>
            <a
              href='https://github.com/SashaPankov/news-explorer-frontend'
              target='_blank'
            >
              <img src={gitHubLogo} alt='Facebook icon' />
            </a>
          </div>
          <div className='footer__social'>
            <a href='https://www.facebook.com' target='_blank'>
              <img src={faceBookLogo} alt='Facebook icon' />
            </a>
          </div>
        </div>
      </div>
      {isMobile && (
        <p className='footer__copyright'>
          © Sasha Pankov, Powered by{' '}
          <a
            className='footer__ref'
            href='https://newsapi.org/'
            target='_blank'
          >
            News API
          </a>
        </p>
      )}
    </footer>
  );
}

export default Footer;
