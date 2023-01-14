import button from "../styles/Button.module.css";
import styles from "../styles/Navbar.module.css";
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const NavbarAbout = () => {
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
        <Link href="/Dashboard" className={button.primary}>Dashboard</Link>
        <Link href="/AboutUs" className={button.primary} >About Us</Link>
        <Link href="/" className={button.primary} >Settings</Link>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
      </div>
  );
};
export default NavbarAbout;
