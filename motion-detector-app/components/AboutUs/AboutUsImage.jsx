import styles from "/styles/AboutUs/AboutUsImage.module.css";
import {useInView} from 'react-intersection-observer';

const AboutUsImage = () => {
  const { ref: containerRef, inView: containerVisible} = useInView();
  return (
    <div ref={containerRef} className={`${styles.container} ${containerVisible ? styles.animateContainer : ''}` }>
        <div className={styles.teamNameContainer}>
            <div className={styles.teamName}>
                <h1> TEAM CPETS: 100.0% </h1>
            </div>
        </div>
        <div className={styles.containerImage}>
            <img src="/images/AboutUsImage.png" alt="Developers' Group Photo" />
        </div>
    </div>
    
  );
};

export default AboutUsImage;
