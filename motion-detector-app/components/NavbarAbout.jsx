import Button from "./Button";
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
        <Button variant="secondary"><Link href="/Dashboard">Dashboard</Link></Button>
        <Button variant="primary"><Link href="/AboutUs">About Us</Link></Button>
        <Button variant="secondary"><Link href="/">Settings</Link></Button>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
      </div>
  );
};
export default NavbarAbout;
