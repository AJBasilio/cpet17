/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import styles from "../styles/settings.module.css";
import Link from "next/link";
import { useState} from 'react';
import {getSession, useSession, signOut } from 'next-auth/react';
import {useFormik} from 'formik';
import {settingsValidate} from "../lib/validate";
import { useRouter } from "next/router";
import toast from "../components/Toast";
import * as React from "react";

export default function settings(){

    const router = useRouter()
    const[show, setShow] = useState(false)
    const[nshow, setnShow] = useState(false)
    const[cnshow, setcnShow] = useState(false)
    const {data:session} = useSession()

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
      }, []);

    const dismiss = React.useCallback(() => {
    toast.dismiss();
    }, []);

    // Settings Formik
    const formik = useFormik({
        initialValues: {
            opassword: '',
            npassword: ''
        },
        validate: settingsValidate,
        onSubmit
    });

    async function onSubmit(values) {
        const opassword = values.opassword
        const npassword = values.npassword
        const cnpassword = values.cnpassword
        const ses_email = session.user.email
        console.log(ses_email)

        const data = { ses_email, opassword, npassword }

        await fetch('http://192.168.0.110:4000/change-pass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if (data) {
                router.push('/Dashboard')
                notify("success", "Password Change.")
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return(
    <div>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Account</title>
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
                    <h2 className="text-white fw-bold "> Account Details </h2>
                </div>
                <hr className="text-white"/>
            </div>
            <div className="card-body p-1">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h4  className='text-white fw-bold'>  </h4>
                    <section className={`${styles.formContainer}`}>

                    <form className="d-flex flex-column " onSubmit={formik.handleSubmit}>
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
                         <span className='d-block text-center text-white justify-content-center align-items-center mx-4'>
                                <h5 className=' fw-bold '>
                                    Change Password 
                                </h5>
                                <span><p style={{fontSize:'14px', textAlign:'center'}}>Unfortunately, accounts from <span className='text-warning fw-bold'>Google</span> or 
                                <span className='text-warning fw-bold'> Github</span><br/> can't change their password</p></span>
                        </span>
                        <div className='d-flex flex-column gap-3'>
                            <div className="input-group d-flex flex-column justify-content-center">
                                <div className='gap-2 d-flex flex-row justify-content-between'>
                                    <div className={styles.inputLabel}>
                                        Password
                                    </div>
                                    {formik.errors.opassword && formik.touched.opassword ? 
                                    <span className={styles.guide}>{formik.errors.opassword}</span> : <></>}
                                </div>
                                <input className={styles.formControl}
                                type={`${show ?"text":"password"}`}
                                name="password"
                                placeholder="Password"
                                {...formik.getFieldProps('opassword')}
                                />
                                <span className={styles.passwordLogo} onClick={()=> setShow(!show)}>
                                <img src="/logo/Surveillhanz.png" width={25} height={25} />
                                </span>
                            </div>
                            <div className="input-group d-flex flex-column justify-content-center">
                                <div className='gap-2 d-flex flex-row justify-content-between'>
                                    <div className={styles.inputLabel}>
                                        New Password
                                    </div>
                                    {formik.errors.npassword && formik.touched.npassword ? 
                                    <span className={styles.guide}>{formik.errors.npassword}</span> : <></>}
                                </div>
                                <input className={styles.formControl}
                                type={`${nshow ?"text":"password"}`}
                                name="npassword"
                                placeholder="New Password"
                                {...formik.getFieldProps('npassword')}
                                />
                                <span className={styles.passwordLogo} onClick={()=> setnShow(!nshow)}>
                                <img src="/logo/Surveillhanz.png" width={25} height={25} />
                                </span>
                            </div>
                            <div className="input-group d-flex flex-column justify-content-center">
                                <div className='gap-2 d-flex flex-row justify-content-between'>
                                    <div className={styles.inputLabel}>
                                        Confirm New Password
                                    </div>
                                    {formik.errors.cnpassword && formik.touched.cnpassword ? 
                                    <span className={styles.guide}>{formik.errors.cnpassword}</span> : <></>}
                                </div>
                                <input className={styles.formControl}
                                type={`${cnshow ?"text":"password"}`}
                                name="cnpassword"
                                placeholder="Confirm New Password"
                                {...formik.getFieldProps('cnpassword')}
                                />
                                <span className={styles.passwordLogo} onClick={()=> setcnShow(!cnshow)}>
                                <img src="/logo/Surveillhanz.png" width={25} height={25} />
                                </span>
                            </div>
                            <div className="input-button">
                                <button type="submit" className={styles.formControlButton}>
                                    Confirm
                                </button>
                            </div>
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
