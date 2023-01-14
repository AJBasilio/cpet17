/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import styles from "../styles/Login.module.css";
import Link from "next/link";
import { useState} from 'react';
import {getSession, useSession, signOut } from 'next-auth/react';

export default function settings(){

    const[show, setShow] = useState(false)
    const[nshow, setnShow] = useState(false)
    const {data:session} = useSession()

    return(
    <div>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Surveillhanz | Log In</title>
        <link rel="icon" href="logo/Surveillhanz.ico"/>
    </Head>
    <div className={styles.container}>
        <div className="card d-flex w-50 shadow-lg" style={{backgroundColor:'#1c1c1c',minHeight:'80vh',border:'white 1px ridge',padding:'0px 30px 50px 30px',borderRadius:'30px'}}>
            <div className="card-header" style={{border:'none', padding:'20px 50px 0px 50px'}}>
                <div className="d-flex justify-content-center align-items-center mb-3 w-100" >
                <Link href={'/'}>
                    <img className={styles.Logo} src="/logo/Surveillhanz.png"> 
                    
                    </img>
                </Link>
                </div>
                <div className="d-flex justify-content-center align-items-center" >
                    <h2 className="text-white fw-bold "> Account Profile </h2>
                </div>
                <hr className="text-white"/>
            </div>
            <div className="card-body p-1">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h4  className='text-white fw-bold'>  </h4>
                    <section className={`${styles.formContainer}`}>
                    <form className="d-flex flex-column gap-4">
                        <div className="text-white d-block">
                            <span className='d-block text-center mb-3'>
                                <h5 className='fw-bold'>
                                    Username 
                                </h5>
                                <span>{session.user.name}</span>
                            </span>
                            <span className='d-block text-center'>
                                <h5 className='fw-bold'>
                                    Email 
                                </h5>
                                <span>{session.user.email}</span>
                            </span>
                        </div>

                        <hr className="text-white"/>
                        <h5 className='fw-bold text-center text-white'>
                                    Change Password
                                </h5>
                        <div className="input-group">
                            
                            <input className={styles.formControl}
                            type={`${show ?"text":"password"}`}
                            name="password"
                            placeholder="Old Password"
                            />
                            <span className={styles.passwordLogo} onClick={()=> setShow(!show)}>
                                <img src="/logo/Surveillhanz.png" width={25} height={25} />
                            </span>
                        </div>
                        <div className="input-group">
                            <input className={styles.formControl}
                            type={`${nshow ?"text":"password"}`}
                            name="npassword"
                            placeholder="New Password"
                            />
                            <span className={styles.passwordLogo} onClick={()=> setnShow(!nshow)}>
                                <img src="/logo/Surveillhanz.png" width={25} height={25} />
                            </span>
                        </div>
                        <div className="input-button">
                            <button type="submit" className={styles.formControlButton}>
                                <Link href={'/settings'} className="text-decoration-none text-white">Confirm</Link>
                            </button>
                        </div>
                    </form>
                    </section>
                </div>
            </div>
        </div>
    </div>
    <div className={styles.floatButton}>
            <Link href="/Dashboard"><img className={styles.LogoAppear} src="/logo/backLogo.png" height={30} width={30}/>Back</Link>
        </div>
    
    </div>

    )
      
}

export async function getServerSideProps({req}) {
    const session = await getSession({req})
  
    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
  
    return {
      props: { session }
    }
  }
