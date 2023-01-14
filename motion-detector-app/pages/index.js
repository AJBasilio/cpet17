import Hero from "../components/Home/Hero";
import NavbarHome from "../components/NavbarHome";
import Instruments from "../components/Home/Instruments";
import Definition from "../components/Home/Definition";
import Footer from "../components/Footer";
import Head from 'next/head';
import { getSession } from "next-auth/react";
import 'bootstrap/dist/css/bootstrap.css';

function Surveillhanz() {
  return (
    <div>
      <Head>
        <title>Surveillhanz</title>
        <link rel="icon" href="logo/Surveillhanz.ico"/>
      </Head>
      <NavbarHome/>
      <Hero/>
      <Definition/>
      <Instruments />
      <Footer/>
    </div>
  );
}
export default Surveillhanz;

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