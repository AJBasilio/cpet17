
import styles from "../styles/Navbar.module.css";

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
    </div>
  );
};
export default NavbarAbout;
