import Button from "./Button";
import styles from "../styles/Navbar.module.css";
import Link from 'next/link';
import { useSession,signIn,signOut } from 'next-auth/react';

const NavbarDashboard = () => {
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
        <Button variant="primary"><Link href="/Dashboard">Dashboard</Link></Button>
        <Button variant="secondary"><Link href="/AboutUs">About Us</Link></Button>
        <Button variant="secondary"><Link href="/">Settings</Link></Button>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
      </div>
  );
};
export default NavbarDashboard;
