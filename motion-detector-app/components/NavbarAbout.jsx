
import styles from "../styles/Navbar.module.css";
import Link from 'next/link';

const NavbarAbout = () => {
  return (
    <div className={styles.container}>
      <Link href="/" style={{textDecoration:'none'}}>
      <div className={styles.Title}>
        <div>
          <img src="/logo/Surveillhanz.png" />
        </div>
        <div>
          <h1> Surveillhanz</h1>
        </div>
      </div>
      </Link>
    </div>
  );
};
export default NavbarAbout;
