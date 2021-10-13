import '../styles/globals.css'
import { useRouter } from 'next/router'
import Layout from '../components/Layout/Layout'
import {ModalContextProvider} from '../store/modal-context'


function MyApp({ Component, pageProps }) {

  const { asPath } = useRouter()

  if (!asPath.includes('/admin')) {
    return <ModalContextProvider><Layout><Component {...pageProps} /></Layout></ModalContextProvider>
  }
  else return <Component {...pageProps} />
  
}

export default MyApp
