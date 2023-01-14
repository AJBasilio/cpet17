import styles from "/styles/Home/Hero.module.css";
import {useInView} from 'react-intersection-observer';

const Hero = () => {
  const { ref: containerRef, inView: containerVisible} = useInView();

  return (
    <div ref={containerRef} className={`${styles.container} ${containerVisible ? styles.animateContainer : ''}` }>
      <div className={styles.containerText}>
        <h1>Object Recognition</h1>
        <h2>Live objects identification</h2>
      </div>
      <div className={styles.containerImage}>
        <img src="/images/DogcatImage.png" alt="Sample Image Object Recognition" />
      </div>
    </div>
  );
};

export default Hero;
