import Header from "./Header"
import Footer from './Footer'


const Layout = ({ children }) => {

    

    return (
        <div className="wrapper">
            <Header />
            {children}
            <Footer />
        </div>

    )
}


export default Layout