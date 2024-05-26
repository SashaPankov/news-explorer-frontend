import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import menuIcon from '../../assets/menu.svg';
import menuSignedIcon from '../../assets/menusigned.svg';
import closeIcon from '../../assets/close.svg';
import closeIconSigned from '../../assets/closesigned.svg';

import './NavigationMobile.css';

function NavigationMobile({
  signedIn = false,
  headerExpanded = false,
  onHeaderExpandClick,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = useContext(CurrentUserContext);

  return (
    <div
      className={signedIn ? 'navigationm navigationm_signedin' : 'navigationm'}
    >
      <button className='navigationm__menu' onClick={onHeaderExpandClick}>
        {
          <img
            className='navigationm__menu-icon'
            src={
              headerExpanded
                ? !signedIn
                  ? closeIcon
                  : closeIconSigned
                : !signedIn
                ? menuIcon
                : menuSignedIcon
            }
          />
        }
      </button>
    </div>
  );
}

export default NavigationMobile;
