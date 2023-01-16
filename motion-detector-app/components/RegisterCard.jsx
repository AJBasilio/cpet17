
import Link from "next/link";
import styles from "../styles/Register.module.css";
import { useState } from 'react';
import {useFormik} from 'formik';
import {registerValidate} from "../lib/validate";
import { useRouter } from "next/router";
import toast from "../components/Toast";
import * as React from "react";

const RegisterCard = () => {

    const router = useRouter()
    const[show, setShow] = useState(false)
    const[cshow, setcShow] = useState(false)

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
      }, []);

    const dismiss = React.useCallback(() => {
    toast.dismiss();
    }, []);

    // Register Formik
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validate: registerValidate,
        onSubmit
    });

    async function onSubmit(values) {
        const username = values.username
        const email = values.email
        const password = values.password

        const data = { username, email, password };

        await fetch('http://localhost:4000/register', {
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
                router.push('/login')
                notify("success", "Successfully Registered.")
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }

    return (
    <div>
    <div className={styles.container}>
        <div className="card d-flex w-50" style={{backgroundColor:'#1c1c1c',minHeight:'80vh',border:'white 1px ridge',padding:'0px 30px 50px 30px',borderRadius:'30px'}}>
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
                    <h4  className='text-white fw-bold'> REGISTER </h4>
                    <section className={`${styles.formContainer}`}>

                    <form className="d-flex flex-column" onSubmit={formik.handleSubmit}>
                        <div className='d-flex flex-column'>
                            <div className="input-group mt-4 d-flex flex-column justify-content-center">
                                <div className='gap-2 d-flex flex-row justify-content-between'>
                                    <div className={styles.inputLabel}>
                                        Username
                                    </div>
                                    {formik.errors.username && formik.touched.username ? 
                                    <span className={styles.guide}>{formik.errors.username}</span> : <></>}
                                </div>
                                <input className={styles.formControl}
                                type="text" 
                                name="username"
                                placeholder="Username"
                                {...formik.getFieldProps('username')}
                                />
                            </div>
                            <div className="input-group d-flex flex-column justify-content-center">
                                <div className='gap-2 d-flex flex-row justify-content-between'>
                                    <div className={styles.inputLabel}>
                                        Email
                                    </div>
                                    {formik.errors.email && formik.touched.email ? 
                                    <span className={styles.guide}>{formik.errors.email}</span> : <></>}
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
                                    <div className={styles.inputLabel}>
                                        Password
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
                                </div>
                                <input className={styles.formControl}
                                type={`${cshow ?"text":"password"}`}
                                name="cpassword"
                                placeholder="Confirm Password"
                                />
                                <span className={styles.passwordLogo} onClick={()=> setcShow(!cshow)}>
                                    <img src="/logo/Surveillhanz.png" width={25} height={25} />
                                </span>
                            </div>
                            <div className="input-button">
                                <button type="submit" className={styles.formControlButton}>
                                    Register 
                                </button>
                            </div>
                        </div>
                        
                    </form>
                        <p className="text-white mt-4 d-flex justify-content-center gap-2">
                            Already have an account?
                            <Link href={'/login'} className={styles.signIn}>Sign In</Link>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    </div>
    <div className={styles.floatButton}>
        <Link href="/"><img src="/logo/homeLogo.png" height={25} width={25}/>Home</Link>
    </div>
    </div>
    );
  };
  export default RegisterCard;
  