import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import styles from "../styles/Login.module.css";
import Link from "next/link";
import {useFormik} from 'formik';
import {confirmValidate} from '../lib/validate';
import * as React from "react";
import { useRouter } from 'next/router';
import toast from "../components/Toast";


export default function forgotpassword(){

    const router = useRouter()

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
      }, []);

    const dismiss = React.useCallback(() => {
    toast.dismiss();
    }, []);

    // Forgot Password Formik
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: confirmValidate,
        onSubmit,
    });

    async function onSubmit(values) {

        const email = values.email

        const data = { email };

        await fetch('http://localhost:4000/forgot-pass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data) {

                const name = data.username;
                const email = data.email

                if (data.message === "Email does not exist.") {
                    notify("error", data.message)
                } else {
                    router.push({pathname: '/resetPassword',
                            query: { name: name, email: email }})
                }
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
        <title>Forgot Password</title>
        <link rel="icon" href="logo/Surveillhanz.ico"/>
    </Head>
    <div className={styles.container} style={{alignItems:'center !important '}}>
        <div className="card d-flex w-50 shadow-lg" style={{backgroundColor:'#1c1c1c',minHeight:'80vh',border:'white 1px ridge',padding:'0px 30px 0px 30px',borderRadius:'30px'}}>
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
                    <h4  className='text-white fw-bold'> Forgot Password? </h4>
                    <span> <p className='text-white'> Please input your email address for verification.</p></span>
                    <section className={`${styles.formContainer}`}>

                        <form className="d-flex flex-column" onSubmit={formik.handleSubmit}>
                            <div className='d-flex flex-column gap-1'>
                                <div className="input-group mt-4 d-flex flex-column justify-content-center">
                                    <div className='gap-2 d-flex flex-row justify-content-between'>
                                        <div className={styles.inputLabel}>
                                            Email
                                        </div>
                                        {formik.errors.email && formik.touched.email ? <span className={styles.guide}>{formik.errors.email}</span> : <></>}
                                    </div>
                                    <input className={styles.formControl}
                                    type="email" 
                                    name="email"
                                    placeholder="Email"
                                    {...formik.getFieldProps('email')}
                                    />
                                    
                                </div>
                                
                                <div className="input-button">
                                    <button type="submit" className={styles.formControlButton}>
                                        Submit
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

