import Head from 'next/head';
import RegisterCard from "../components/RegisterCard.jsx";
import 'bootstrap/dist/css/bootstrap.css';
import { getSession } from "next-auth/react";

export default function Register(){

    return(

    
    <div>
    <Head>
        <title>Register</title>
        <link rel="icon" href="logo/Surveillhanz.ico"/>
    </Head>
    <RegisterCard/>
        
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