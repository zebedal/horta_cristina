import Navigation from './Navigation'
import styles from './Header.module.css'
import { UserOutlined, ShoppingCartOutlined, LoginOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import ModalContext from '../../store/modal-context'
import AuthContext from '../../store/auth-context'
import ModalWrapper from '../../components/UI/ModalWrapper'
import LoginRegister from '../loginregister/LoginRegister'
import 'antd/dist/antd.css'
import { getSession } from 'next-auth/client'


const Header = props => {

    const { visible, openModal } = useContext(ModalContext)
    const { logedIn, logOut } = useContext(AuthContext)

    const [session, setSession] = useState(null)


    useEffect(() => {
        getSession().then(session => {
            setSession(session)
        })
    }, [logedIn])


    return (
        <div className={styles.wrapper}>
            <header className={`${styles.Header}`}>
                <img src="/assets/logo.svg" alt="" className={styles.logo} />
                <Navigation />
                <div className={styles.commerce} >
                    {!session && <div onClick={() => openModal(true)}><LoginOutlined style={{ color: 'var(--text-color)' }} /><span style={{ fontSize: '13px', fontWeight: '500' }}>&nbsp;LOGIN</span></div>}
                    {session && <div className={styles.userWrapper}>
                        <UserOutlined /><span style={{ fontSize: '12px' }}>Olá, {session ? session.user.name : ""}</span>
                        <div className={styles.userOptions}>
                            <div>Área de cliente</div>
                            <div onClick={(logOut)}>Logout</div>
                        </div>
                    </div>}
                    <ShoppingCartOutlined style={{ color: 'var(--text-color)' }} />
                </div>

                {visible && <ModalWrapper><LoginRegister /></ModalWrapper>}
            </header>
        </div>
    )
}




export default Header