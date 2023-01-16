import Link from "next/link";
import styles from "/styles/AboutUs/AboutUsLinks.module.css";
import {useInView} from 'react-intersection-observer';

const AboutUsLinks = () => {
  const { ref: containerRef, inView: containerVisible} = useInView();
  const { ref: contactsDivRef, inView: contactsDivVisible} = useInView();
  const { ref: idPictureRef, inView: idPictureVisible} = useInView();
  const { ref: idPictureRef2, inView: idPictureVisible2} = useInView();
  const { ref: idPictureRef3, inView: idPictureVisible3} = useInView();
  const { ref: idPictureRef4, inView: idPictureVisible4} = useInView();
  const { ref: idPictureRef5, inView: idPictureVisible5} = useInView();
  return (
    <div ref={containerRef} className={`${styles.container} ${containerVisible ? styles.animateContainer : ''}` }>
      <div ref={contactsDivRef}>
        <h1 className={`${contactsDivVisible ? styles.typewriter : ''}` }><span>MEET</span></h1>
        <h1 className={`${contactsDivVisible ? styles.typewriter2 : ''}` }><span style={{letterSpacing:'15px',marginLeft:'7px'}}>THE</span></h1>
        <h1 className={`${contactsDivVisible ? styles.typewriter3 : ''}` }><span style={{marginLeft:'7px'}}>TEAM</span></h1>
      </div>
      <div ref={contactsDivRef} className={`${styles.ContactsDiv} ${contactsDivVisible ? styles.animateContactsDiv : ''}` }>
        <div className={styles.contacts}>
          <h5>Dominick Hanz Joson</h5>
          <img ref={idPictureRef} className={`${styles.idPicture} ${idPictureVisible ? styles.animateIdPicture : ''}` } src="/images/domsPic.jpg" alt="Sample Image Object Recognition" />
          <div className={styles.Links}>
            <Link className={styles.fbLink} target="_blank" href="https://www.facebook.com/dominickhanz.joson.7"><img className={styles.LinkLogo} src="logo/facebookLogo.svg" alt="FacebookLogo" /> <img className={styles.LinkLogoColored} src="logo/facebookLogo.png" alt="FacebookLogo" /><p>Facebook</p></Link>
            <Link className={styles.gmLink} target="_blank" href="https://mail.google.com/mail/u/lee@example.org/?view=cm&to=dominickhanz.joson%40gsfe.tupcavite.edu.ph"><img className={styles.LinkLogo} src="logo/gmailLogo.svg" alt="FacebookLogo" /> <img className={styles.LinkLogoColored} src="logo/gmailLogo.png" alt="GmailLogo" /><p>Gmail</p></Link>
          </div>
        </div>
      </div>
      <div ref={contactsDivRef} className={`${styles.ContactsDiv} ${contactsDivVisible ? styles.animateContactsDiv : ''}` }>
        <div className={styles.contacts}>
          <h5>Leo Mar Dela Cruz</h5>
          <img ref={idPictureRef2} className={`${styles.idPicture} ${idPictureVisible2 ? styles.animateIdPicture2 : ''}` } src="/images/leoPic.jpg" alt="Sample Image Object Recognition" />
          <div className={styles.Links}>
            <Link className={styles.fbLink} target="_blank" href="https://www.facebook.com/leomar0029"><img className={styles.LinkLogo} src="logo/facebookLogo.svg" alt="FacebookLogo" /> <img className={styles.LinkLogoColored} src="logo/facebookLogo.png" alt="FacebookLogo" /><p>Facebook</p></Link>
            <Link className={styles.gmLink} target="_blank" href="https://mail.google.com/mail/u/lee@example.org/?view=cm&to=leomar.delacruz@gsfe.tupcavite.edu.ph "><img className={styles.LinkLogo} src="logo/gmailLogo.svg" alt="FacebookLogo" /> <img className={styles.LinkLogoColored} src="logo/gmailLogo.png" alt="GmailLogo" /><p>Gmail</p></Link>
          </div>
        </div>
      </div>
      <div ref={contactsDivRef} className={`${styles.ContactsDiv} ${contactsDivVisible ? styles.animateContactsDiv : ''}` }>
        <div className={styles.contacts}>
          <h5>John Ray Fetalvero</h5>
          <img ref={idPictureRef3} className={`${styles.idPicture} ${idPictureVisible3 ? styles.animateIdPicture3 : ''}` } src="/images/mamiPic.png" alt="Sample Image Object Recognition" />
          <div className={styles.Links}>
            <Link className={styles.fbLink} target="_blank" href="https://www.facebook.com/fetalvero.jr"><img className={styles.LinkLogo} src="logo/facebookLogo.svg" alt="FacebookLogo" /> <img className={styles.LinkLogoColored} src="logo/facebookLogo.png" alt="FacebookLogo" /><p>Facebook</p></Link>
            <Link className={styles.gmLink} target="_blank" href="https://mail.google.com/mail/u/lee@example.org/?view=cm&to=johnray.fetalvero@gsfe.tupcavite.edu.ph "><img className={styles.LinkLogo} src="logo/gmailLogo.svg" alt="FacebookLogo" /> <img className={styles.LinkLogoColored} src="logo/gmailLogo.png" alt="GmailLogo" /><p>Gmail</p></Link>
          </div>
        </div>
      </div>
      <div ref={contactsDivRef} className={`${styles.ContactsDiv} ${contactsDivVisible ? styles.animateContactsDiv : ''}` }>
        <div className={styles.contacts}>
          <h5>Arsher James Basilio</h5>
          <img ref={idPictureRef4} className={`${styles.idPicture} ${idPictureVisible4 ? styles.animateIdPicture4 : ''}` } src="/images/ajPic.jpg" alt="Sample Image Object Recognition" />
          <div className={styles.Links}>
            <Link className={styles.fbLink} target="_blank" href="https://www.facebook.com/AyJay.mes"><img className={styles.LinkLogo} src="logo/facebookLogo.svg" alt="FacebookLogo" /> <img className={styles.LinkLogoColored} src="logo/facebookLogo.png" alt="FacebookLogo" /><p>Facebook</p></Link>
            <Link className={styles.gmLink} target="_blank" href="https://mail.google.com/mail/u/lee@example.org/?view=cm&to=arsherjames.basilio@gsfe.tupcavite.edu.ph "><img className={styles.LinkLogo} src="logo/gmailLogo.svg" alt="FacebookLogo" /> <img className={styles.LinkLogoColored} src="logo/gmailLogo.png" alt="GmailLogo" /><p>Gmail</p></Link>
          </div>
        </div>
      </div>
      <div ref={contactsDivRef} className={`${styles.ContactsDiv} ${contactsDivVisible ? styles.animateContactsDiv : ''}` }>
        <div className={styles.contacts}>
          <h5>Jhon Carlo Luna</h5>
          <img ref={idPictureRef5} className={`${styles.idPicture} ${idPictureVisible5 ? styles.animateIdPicture5 : ''}` } src="/images/carloPic.jpg" alt="Sample Image Object Recognition" />
          <div className={styles.Links}>
            <Link className={styles.fbLink} target="_blank" href="https://www.facebook.com/Carlo.Luna24"><img className={styles.LinkLogo} src="logo/facebookLogo.svg" alt="FacebookLogo" /> <img className={styles.LinkLogoColored} src="logo/facebookLogo.png" alt="FacebookLogo" /><p>Facebook</p></Link>
            <Link className={styles.gmLink} target="_blank" href="https://mail.google.com/mail/u/lee@example.org/?view=cm&to=jhoncarlo.luna@gsfe.tupcavite.edu.ph"><img className={styles.LinkLogo} src="logo/gmailLogo.svg" alt="FacebookLogo" /> <img className={styles.LinkLogoColored} src="logo/gmailLogo.png" alt="GmailLogo" /><p>Gmail</p></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsLinks;
