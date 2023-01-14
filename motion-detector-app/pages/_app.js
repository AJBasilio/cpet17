import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion';
import { SessionProvider } from 'next-auth/react';
import 'bootstrap/dist/css/bootstrap.css';


function MyApp({ Component, pageProps, router }) {
  
  return (
  <SessionProvider session={pageProps.session}>
    <AnimatePresence>
      <Component {...pageProps} />
    </AnimatePresence>
  </SessionProvider>
  )
}

export default MyApp
