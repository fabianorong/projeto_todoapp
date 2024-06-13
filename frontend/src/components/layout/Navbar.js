import { Link } from "react-router-dom";
import { useContext } from "react";

import styles from "./Navbar.module.css";

import Logo from "../../assets/img/logo.png";

// Context
import { Context } from "../../context/UserContext";

function Navbar() {
  const { authenticated, logout, resetpassword } = useContext(Context);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="To Do App" />
        <h2>To Do App</h2>
      </div>
      <ul>
        <li className={styles.btn_home}>
          <Link to="/">Home</Link>
        </li>

        {authenticated ? (
          <>
            <li className={styles.btn_home}>
              <Link to="/task/mytasks">My Tasks</Link>
            </li>
            <li className={styles.btn_home}>
              <Link to="/user/profile">Profile</Link>
            </li>

            <li className={styles.btn_register} onClick={logout}>
              Log Out
            </li>
          </>
        ) : (
          <>
            <li className={styles.btn_register}>
              <Link to="/register">Register</Link>
            </li>

            <li className={styles.btn_login}>
              <Link to="/login">Log In</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
