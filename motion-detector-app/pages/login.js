/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import styles from "../styles/Login.module.css";
import Link from "next/link";
import {useState} from 'react';
import {getSession, useSession, signIn, signOut } from 'next-auth/react';
import {useFormik} from 'formik';
import login_validate from '../lib/validate';
import { useRouter } from 'next/router';
import toast from "../components/Toast";
import * as React from "react";

export default function Login(){

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
      }, []);

    const dismiss = React.useCallback(() => {
    toast.dismiss();
    }, []);

    const[show, setShow] = useState(false)
    const router = useRouter()

    // Google Handler function
    async function handleGoogleSignin(){
        signIn('google', {callbackUrl: "http://localhost:3000/Dashboard"})
    }

    // Github Handler function
    async function handleGithubSignin(){
        signIn('github', {callbackUrl: "http://localhost:3000/Dashboard"})
    }

    // Login Formik
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: login_validate,
        onSubmit,
    });

    async function onSubmit(values) {
        const status = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: "http://localhost:3000/Dashboard"
        })
        if (status.ok) {
            router.push(status.url)
            notify("success", "Successfully Logged In.")
        } else {
            notify("error", "Invalid Credentials.")
        }        
    }

    return(
    <div>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Log In</title>
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
                    <h2 className="text-white fw-bold "> Surveillhanz</h2>
                </div>
                <hr className="text-white"/>
            </div>
            <div className="card-body p-1">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h4  className='text-white fw-bold'> SIGN IN </h4>
                    <section className={`${styles.formContainer}`}>


                    <form className="d-flex flex-column" onSubmit={formik.handleSubmit}>
                        <div className='d-flex flex-column'>
                            <div className="input-group mt-4 d-flex flex-column justify-content-center">
                                <div className='gap-2 d-flex flex-row justify-content-between'>
                                    <div className={styles.inputLabel}>
                                        Email
                                    </div>
                                    {formik.errors.email && formik.touched.email ? <div className={styles.guide}>{formik.errors.email}</div> : <></>}
                                </div>
                                <input className={styles.formControl}
                                type="email" 
                                name="email"
                                placeholder="Email"
                                {...formik.getFieldProps('email')}
                                />
                                
                            </div>
                            <div className="input-group d-flex flex-column justify-content-center">
                                <div className='gap-2 d-flex flex-row justify-content-between'>
                                <span className={styles.inputLabel}>
                                    Password
                                </span>
                                {formik.errors.password && formik.touched.password ? 
                                <span  className={styles.guide}>{formik.errors.password}</span> : <></>}
                                </div>
                               
                                <input className={styles.formControl}
                                type={`${show ?"text":"password"}`}
                                name="password"
                                placeholder="Password"
                                {...formik.getFieldProps('password')}
                                />
                                <span className={styles.passwordLogo} onClick={()=> setShow(!show)}>
                                    <img src="/logo/Surveillhanz.png" width={25} height={25} />
                                </span>
                            </div>
                            <div>
                                <span className='justify-content-end d-flex my-2'>
                                    <Link href='/forgotpassword' className={styles.forgotPassword}>
                                        Forgot Password?
                                    </Link>
                                </span>
                            </div>
                            <div className="input-button">
                                <button type="submit" className={styles.formControlButton}>
                                    Sign In
                                </button>
                            </div>
                        </div>
                   
                        
                        <p className={styles.or}> or </p>
                        <div className='d-flex flex-column gap-2'>
                            <div className="input-button">
                                <button type="button" onClick={(handleGoogleSignin)} className={styles.formControlButton}>
                                    <img src="/images/googleLogo.png" alt="Google Logo" width={20} height={20} /> Sign In With Google 
                                </button>
                            </div>
                            <div className="input-button">
                                <button type="button" onClick={handleGithubSignin} className={styles.formControlButton}>
                                <img src="/logo/githubLogoWhite.jpg" alt="Github Logo" width={20} height={20} /> Sign In With Github 
                                </button>
                            </div>
                        </div>
                    </form>
                    
                        <p className="text-white mt-4 d-flex justify-content-center gap-2">
                            Dont have an account yet?
                            <Link href={'/register'} className={styles.signUp}>Sign Up</Link>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    </div>
    <div className={styles.floatButton}>
            <Link href="/"><img className={styles.LogoAppear} src="/logo/homeLogo.png" height={25} width={25}/>Home</Link>
    </div>
    
    </div>

    )
      
}

// Redirect to Dashboard page when you are already authenticated
export async function getServerSideProps({req}) {
    const session = await getSession({req})
  
    if (!session) {
      return {
        props: { session }
      }
    }
  
    return {
      redirect: {
        destination: '/Dashboard',
        permanent: false
      }
    }
  }