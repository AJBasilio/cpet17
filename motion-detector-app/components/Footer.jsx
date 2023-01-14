
import styles from "../styles/Footer.module.css";
import Link from 'next/link';

const Footer = () => {
    return (
      <div className={styles.container}>
        <div className="d-flex gap-1 justify-content-center align-items-center">
          <p className="text-muted m-0">Copyright © 2022 All rights reserved </p>
          <p className="text-muted m-0"> | </p>
          <Link target="_blank"className={styles.aboutUsButton} href="/AboutUs">About Us</Link>
        </div>
        
        
      </div>
    );
  };
  export default Footer;
  