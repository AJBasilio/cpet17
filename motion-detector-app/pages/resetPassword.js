import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import styles from "../styles/Login.module.css";
import Link from "next/link";
import {useFormik} from 'formik';
import {forgotPassword} from '../lib/validate';
import * as React from "react";
import { useState } from 'react';
import { useRouter } from 'next/router';
import toast from "../components/Toast";

export default function Login(){

    const[show, setShow] = useState(false)
    const[cshow, setcShow] = useState(false)

    const router = useRouter()
    const name = router.query.name
    const email_query = router.query.email

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
      }, []);

    const dismiss = React.useCallback(() => {
    toast.dismiss();
    }, []);

    // Forgot Password Formik
    const formik = useFormik({
        initialValues: {
            password: '',
            cpassword: '',
        },
        validate: forgotPassword,
        onSubmit
    });

    async function onSubmit(values) {

        const password = values.password
        const email = email_query

        const data = { email, password };

        await fetch('http://192.168.0.110:4000/submit-pass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                router.push('/login');
                notify("success", "Password Change.");
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
        <title>Reset Password</title>
        <link rel="icon" href="logo/Surveillhanz.ico"/>
    </Head>
    <div className={styles.container} style={{alignItems:'center !important '}}>
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
            <div className="card-body">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h4  className='text-white fw-bold mb-4'> Reset Password </h4>
                    <h5  className='text-white fw-bold'> Account Email </h5>
                    <span> <p className='text-white'> {email_query} </p></span>

                    <h5  className='text-white fw-bold'> Account Username </h5>
                    <span> <p className='text-white'> {name} </p></span>

                    <section className={`${styles.formContainer}`}>
                        <form className="d-flex flex-column" onSubmit={formik.handleSubmit}>
                            <div className='d-flex flex-column gap-1'>
                                <div className="input-group d-flex flex-column justify-content-center">
                                    <div className='gap-2 d-flex flex-row justify-content-between'>
                                        <div className={styles.inputLabel}>
                                            New Password
                                        </div>
                                        {formik.errors.password && formik.touched.password ? 
                                        <span className={styles.guide}>{formik.errors.password}</span> : <></>}
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
                                <div className="input-group d-flex flex-column justify-content-center">
                                    <div className='gap-2 d-flex flex-row justify-content-between'>
                                        <div className={styles.inputLabel}>
                                            Confirm Password
                                        </div>
                                        {formik.errors.cpassword && formik.touched.cpassword ? 
                                        <span className={styles.guide}>{formik.errors.cpassword}</span> : <></>}
                                    </div>
                                    <input className={styles.formControl}
                                    type={`${cshow ?"text":"password"}`}
                                    name="cpassword"
                                    placeholder="Confirm Password"
                                    {...formik.getFieldProps('cpassword')}
                                    />
                                    <span className={styles.passwordLogo} onClick={()=> setcShow(!cshow)}>
                                        <img src="/logo/Surveillhanz.png" width={25} height={25} />
                                    </span>
                                </div>
                                <div className="input-button">
                                    <button type="submit" className={styles.formControlButton}>
                                        Set New Password
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
        <Link href="/login"><img className={styles.LogoAppear} src="/logo/backLogo.png" height={30} width={30}/>Back</Link>
    </div>
    
    </div>

    )
      
}

