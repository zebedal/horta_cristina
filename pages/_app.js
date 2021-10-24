import '../styles/globals.css'
import { useRouter } from 'next/router'
import Layout from '../components/Layout/Layout'
import {ModalContextProvider} from '../store/modal-context'
import {AuthContextProvider} from '../store/auth-context'



function MyApp({ Component, pageProps }) {

  const { asPath } = useRouter()

  if (!asPath.includes('/admin')) {
    return <AuthContextProvider><ModalContextProvider><Layout><Component {...pageProps} /></Layout></ModalContextProvider></AuthContextProvider>
  }
  else return <Component {...pageProps} />
  
}

export default MyApp
