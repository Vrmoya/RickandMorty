import { Link } from 'react-router-dom';
import SearchBar from '../searchBar/SearchBar';
import Logo from "../../../assets/Logo.svg";
import styles from "./Nav.module.scss"

function Nav({onSearch, logout}) {
  
  return (
    <div className={styles.navContainer}>
          {/* DIV PARA LOGO */}
          <div className={styles.logo}>
              <img src={Logo} alt="R&M Logo" />
          </div>
      
      {/* DIV PARA SEARCH Y NAVIGATION */}
      <div className={styles.secondSection}>
        <div className={styles.wrapperItems}>
          <Link to="/home" className={styles.linknav}>
            <span className={styles.itemnav}>Home</span>
          </Link>
          <Link to="/about" className={styles.linknav}>
            <span className={styles.itemnav}>About</span>
          </Link>
        </div>

        <Link to='/favorites'><button className={styles.btnPersonaje}>Favorites</button></Link>
        <SearchBar onSearch={onSearch} />
        <button className={styles.btnPersonaje} onClick={() => onSearch('random')}>Random</button>
        <button className={styles.btnPersonaje} onClick={logout}>Logout</button>
      </div>
      


    </div>
  );
}

export default Nav;