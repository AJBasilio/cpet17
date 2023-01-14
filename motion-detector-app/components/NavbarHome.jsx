import Button from "./Button";
import styles from "../styles/Navbar.module.css";
import Link from 'next/link';


function Modal({ setOpenModal }) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.title}>
          <h1>Captured Photo</h1>
        </div>
        <div className={styles.body}>
          <img src="images/sample3.png" alt="sample photo" />
        </div>
        <div className={styles.footer}>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

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
        <Button ><Link href="/login" variant="secondary">Log In</Link></Button>
        <Button variant="secondary"><Link href="/Dashboard" >Sign Up</Link></Button>
        
      </div>
      </div>
  );
};
export default NavbarHome;
