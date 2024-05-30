import { useLocation } from 'react-router-dom';
import menuIcon from '../../assets/menu.svg';
import menuIconBlack from '../../assets/menublack.svg';
import closeIcon from '../../assets/close.svg';
import closeIconBlack from '../../assets/closeblack.svg';

import './NavigationMobile.css';

function NavigationMobile({ headerExpanded = false, onHeaderExpandClick }) {
  const location = useLocation();

  const isHomePage = () => {
    return location.pathname === '/';
  };

  return (
    <div
      className={
        isHomePage() ? 'navigationm' : 'navigationm navigationm_nothome'
      }
    >
      <button className='navigationm__menu' onClick={onHeaderExpandClick}>
        {
          <img
            className='navigationm__menu-icon'
            src={
              headerExpanded
                ? isHomePage()
                  ? closeIcon
                  : closeIconBlack
                : isHomePage()
                ? menuIcon
                : menuIconBlack
            }
          />
        }
      </button>
    </div>
  );
}

export default NavigationMobile;
