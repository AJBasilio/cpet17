import AboutUsImage from "../components/AboutUs/AboutUsImage";
import AboutUsText from "../components/AboutUs/AboutUsText";
import AboutUsLinks from "../components/AboutUs/AboutUsLinks";
import Footer from "../components/Footer";
import NavbarAbout from "../components/NavbarAbout";
import Head from 'next/head';
import { getSession } from "next-auth/react";
import 'bootstrap/dist/css/bootstrap.css';



function AboutUs() {
  return (
    <div>
      <Head>
        <title>Surveillhanz | About Us</title>
        <link rel="icon" href="logo/Surveillhanz.ico"/>
        <meta proprety="og:title"content="My page title" key="title"/>
      </Head>
      <NavbarAbout/>
      <AboutUsText/>
      <AboutUsLinks/>
      <AboutUsImage/>
      <Footer/>
    </div>
  );
}

export default AboutUs;

// Redirect to login page if access pages that needed session (logged in)
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