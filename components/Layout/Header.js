import Navigation from './Navigation'
import styles from './Header.module.css'
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import ModalContext from '../../store/modal-context'
import ModalWrapper from '../../components/UI/ModalWrapper'
import LoginRegister from '../LoginRegister'
import 'antd/dist/antd.css'

const Header = props => {

    const {visible, openModal} = useContext(ModalContext)

    return (
        <header className={`${styles.Header}`}>
            <img src="/assets/logo.svg" alt="" className={styles.logo}/>
            <Navigation />
            <div className={styles.commerce} >
                <UserOutlined onClick={() => openModal(true)}/>
                <ShoppingCartOutlined />
            </div>

            {visible && <ModalWrapper><LoginRegister /></ModalWrapper>}
        </header>
    )
}




export default Header