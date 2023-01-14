
import Link from "next/link";
import styles from "../styles/Register.module.css";
import { useState } from 'react';
import {useFormik} from 'formik';


const RegisterCard = () => {

    const[show, setShow] = useState(false)
    const[cshow, setcShow] = useState(false)

    // Register Formik
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            cpassword: ''
        },
        onSubmit
    });

    async function onSubmit(values) {
        console.log(values)
    }

    return (
    <div className={styles.container}>
        <div className="card d-flex w-50" style={{backgroundColor:'#1c1c1c',minHeight:'80vh',border:'white 1px solid',padding:'0px 30px 50px 30px'}}>
            <div className="card-header" style={{border:'none', padding:'20px 50px 0px 50px'}}>
                <div className="d-flex justify-content-center align-items-center mb-3 w-100" >
                    <img className={styles.Logo} src="/logo/Surveillhanz.png"/> 
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

                    <form className="d-flex flex-column gap-4" onSubmit={formik.handleSubmit}>
                        <div className="input-group mt-4">
                            <input required className={styles.formControl}
                            type="text" 
                            name="username"
                            placeholder="Username"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            />
                        </div>
                        <div className="input-group">
                            <input required className={styles.formControl}
                            type="email" 
                            name="email"
                            placeholder="Email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            />
                        </div>
                        <div className="input-group">
                            <input required className={styles.formControl}
                            type={`${show ?"text":"password"}`}
                            name="password"
                            placeholder="Password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            />
                            <span className={styles.passwordLogo} onClick={()=> setShow(!show)}>
                            <img src="/logo/Surveillhanz.png" width={25} height={25} />
                            </span>
                        </div>
                        <div className="input-group">
                            <input required className={styles.formControl}
                            type={`${cshow ?"text":"password"}`}
                            name="cpassword"
                            placeholder="Confirm Password"
                            onChange={formik.handleChange}
                            value={formik.values.cpassword}
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
                        
                    </form>
                        <p className="text-white mt-4 d-flex justify-content-center gap-2">
                            Already have an account?
                            <Link href={'/login'} className="text-decoration-none text-white fw-bold">Sign In</Link>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    </div>
    );
  };
  export default RegisterCard;
  