import styles from "/styles/Home/Definition.module.css";
import {useInView} from 'react-intersection-observer';

const Definition = () => {
  const { ref: shapeRef, inView: shapeVisible} = useInView();
  console.log('is shape visible?:',shapeVisible)

  return (
    <div className={styles.container}>
      <div ref={shapeRef} className={`${styles.Shape} ${shapeVisible ? styles.animateShape : ''}` }>
        <div className={styles.Question}>
            <h1>What is Motion Detection?</h1>
        </div>
        <div className={styles.Answer}>
          <p>
          <span className="text-warning">Motion detection</span> is the process of detecting a change in the position of an 
          object relative to its surroundings or a change in the surroundings relative
           to an object. It can be achieved by either mechanical or electronic methods
          </p>
        </div>
      </div>
    </div>
  );
};

export default Definition;
