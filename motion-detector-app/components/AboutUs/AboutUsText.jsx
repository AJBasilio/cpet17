import styles from "/styles/AboutUs/AboutUsText.module.css";
import {useInView} from 'react-intersection-observer';

const AboutUsText = () => {
  const { ref: containerRef, inView: containerVisible} = useInView();

  return (
    <div ref={containerRef} className={`${styles.container} ${containerVisible ? styles.animateContainer : ''}` }>
      <div className={styles.containerTitle}>
        <h1>About Us</h1>
      </div>
      <div className={styles.containerDefinition}>
        <p>
          We are 4th Year Students from Technological University of the Philippines - 
          Cavite. Currently taking up Embedded System subject, this website is part of 
          our journey towards building a ReactJS Application.
          </p>
      </div>
    </div>
  );
};

export default AboutUsText;
