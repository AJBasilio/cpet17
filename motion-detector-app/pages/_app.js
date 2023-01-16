import '../styles/globals.css'
import * as React from "react";
import { AnimatePresence } from 'framer-motion';
import { SessionProvider } from 'next-auth/react';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from "react-toastify";
import toast from "../components/Toast";
import "react-toastify/dist/ReactToastify.css";


function MyApp({ Component, pageProps, router }) {
  // React.useEffect(() => {
  //   toast({ type: "info", message: "Hello world!" });
  // }, []);
  
  return (
  <SessionProvider session={pageProps.session}>
    <AnimatePresence>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        pauseOnVisibilityChange
        closeOnClick
        pauseOnHover
      />
    </AnimatePresence>
  </SessionProvider>
  )
}

export default MyApp
