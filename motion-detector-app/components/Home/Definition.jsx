import styles from "/styles/Home/Definition.module.css";
import {useInView} from 'react-intersection-observer';

const Definition = () => {
  const { ref: shapeRef, inView: shapeVisible} = useInView();
  console.log('is shape visible?:',shapeVisible)

  return (
    <div className={styles.container}>
      <div ref={shapeRef} className={`${styles.Shape} ${shapeVisible ? styles.animateShape : ''}` }>
        <div className={styles.Question}>
            <h1>What is Object Recognition?</h1>
        </div>
        <div className={styles.Answer}>
          <p>
            The term &quot;object recognition&quot; refers to techniques for physically recognizing 
            known things using optical, auditory, or other physical means inside an object
              space. For instance, an object&apos;s presence in a digital image or video stream, 
              as well as its position and location, are identified.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Definition;
