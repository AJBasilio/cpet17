import button from "../styles/Button.module.css";
import styles from "../styles/Navbar.module.css";
import Link from 'next/link';


const NavbarHome = () => {
  return (
    <div className={styles.container}>
      <div className={styles.Title}>
        <div>
          <img src="/logo/Surveillhanz.png" />
        </div>
        <div>
          <h1> Surveillhanz</h1>
        </div>
      </div>
      <div className={styles.navbarActions}>
        <Link href="/login" className={button.primary}>Log In</Link>
        <Link href="/register" className={button.primary}>Sign Up</Link>
      </div>
    </div>
  );
};
export default NavbarHome;
