import styles from "/styles/Home/Instruments.module.css";
import Link from "next/link";
import {useInView} from 'react-intersection-observer';

const Instruments = () => {
  const { ref: imagesRef, inView: imagesVisible} = useInView();
  console.log('are images visible?:',imagesRef)
  const { ref: shapeRef, inView: shapeVisible} = useInView();
  const { ref: titleRef, inView: titleVisible} = useInView();

  return (
    <div className={styles.container}>
      <div ref={shapeRef} className={`${styles.shape} ${shapeVisible ? styles.animateShape : ''}` }>
        <div ref={imagesRef} className={`${styles.firstRow} ${imagesVisible ? styles.animateImages : ''}` }>
          <div>
              <Link href="https://www.python.org" target="_blank"><img src="images/PythonImage.png" alt="PythonLogo" /></Link>
          </div>
        </div>
        <div ref={imagesRef} className={`${styles.secondRow} ${imagesVisible ? styles.animateImages : ''}` }>
          <div>
            <Link href="https://reactjs.org" target="_blank"><img src="images/ReactImage.png" alt="ReactLogo" /></Link>
          </div>
          <div>
            <Link href="https://nodejs.org/en/" target="_blank"><img src="images/NodeJSImage.png" alt="NodeJSLogo" /></Link>
          </div>
        </div>

      </div>
      <div ref={titleRef} className={`${styles.Title} ${titleVisible ? styles.animateTitle : ''}` }>
        <h1> Softwares used on this project</h1>
      </div>
    </div>
  );
};

export default Instruments;
