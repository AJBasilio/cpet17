import Footer from "../components/Footer";
import { motion } from 'framer-motion';
import styles from "/styles/Dashboard/DashboardContent.module.css";
import Head from 'next/head';
import { useSession, getSession } from "next-auth/react";
import { signOut } from 'next-auth/react';
import 'bootstrap/dist/css/bootstrap.css';
import navbar from "../styles/Navbar.module.css";
import button from "../styles/Button.module.css";
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";
import {useInView} from 'react-intersection-observer';


function Dashboard( {users} ) {
  const {data:session} = useSession()
  console.log(session)

  const image_head = 'data:image/jpeg;base64,';
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  if (session) {
    return (
      <div>
        <Head>
          <title>Dashboard</title>
          <link rel="icon" href="logo/Surveillhanz.ico"/>
        </Head>
  
        <div className={navbar.container}>
          <div className={navbar.Title}>
            <div>
              <img src="/logo/Surveillhanz.png" />
            </div>
            <div>
              <h1> Surveillhanz</h1>
            </div>
          </div>
          
          <div className={navbar.navbarActions}>
          {['down-centered'].map(
          (direction) => (
            <Dropdown autoClose="outside" align="end">
              <Dropdown.Toggle className={button.primary} variant="none" text="white" id="dropdown-basic">
              <img src="/logo/userLogo2.png" height={25} width={25}/><span>{session.user.name}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark" 
              style={{
                  backgroundColor:"#1c1c1c", 
                border:"2px ridge white",
                 color:"#e6e6e6",
                 textAlign:"start",
              }} >
                <Dropdown.Item href="/account" style={{color:"#e6e6e6",fontWeight:"bold"}}><img src="/logo/userLogo2.png" height={25} width={25}/> Account</Dropdown.Item>
                <Dropdown.Item onClick={() => signOut()} style={{color:"#e6e6e6",fontWeight:"bold"}}><img src="/logo/logoutLogo.png" height={25} width={25}/> Sign Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            ),
            )}
          </div>
        </div>

        <motion.div initial="hidden" animate="visible" variants={{
          hidden:{
            scale:0.8,
            opacity:0
          },
          visible: {
            scale:1,
            opacity:1,
            transition:{
              delay:0.3
            }
  
          }
        }
        }>

        </motion.div>
        
        {/* Sample fetching data */}
        <div className={styles.container}>
          <div className={styles.containerText}>
            <h1>Motion Detected Data</h1>
          </div>
            
            {users.map(user => (
                <div  key={user.id} >
                    <h5 className={styles.dateText}>Date Detected: { user.date_time }</h5>
                    <img className={styles.image} src={image_head + Buffer.from(user.captured_image).toString('utf-8')} height={400} width={500}></img>
                </div>
            ))}
        </div>

        <Footer/>
      </div>
    );
  }
  
  
}



export default Dashboard;


// Redirect to login page if access pages that needed session (logged in)
export async function getServerSideProps({req}) {
  const session = await getSession({req})
  const res = await fetch('http://localhost:4000/motion-list');
  const data = await res.json();

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { session, users: data }
  }
}