import { useState, Fragment, useContext } from 'react';
import styles from './LoginRegister.module.css'
import { Result } from 'antd';
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm';
import Button from '../UI/Button'
import ModalContext from '../../store/modal-context';

const LoginRegister = props => {

    const context = useContext(ModalContext)

    const [registerFormOpen, setRegisterFormOpen] = useState(false)
    const [registerSuccess, setRegisterSuccess] = useState(false)

    const registerSuccessHandler = () => {
        setRegisterSuccess(true)
    }

    return (
        <div className={styles.wrapper}>

            {!registerSuccess && <Fragment><div className={styles.formWrapper}>
                {!registerFormOpen && <LoginForm openRegister={() => setRegisterFormOpen(true)} />}
                {registerFormOpen && <RegisterForm closeRegister={() => setRegisterFormOpen(false)} success={registerSuccessHandler} />}
            </div>

                <div className={styles.imgWrapper}>
                    <svg width="110" height="586" viewBox="0 0 110 586" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M56.3541 767.332C45.5805 697.732 26.27 630.34 14.5578 560.932C-2.13673 462.064 -3.1452 359.104 14.1684 260.392C30.9528 164.464 71.8904 64.996 92.6887 -29.792C111.141 -113.852 118.739 -205.628 95.6841 -287L1.71718e-05 -287L0 1153L27.3084 1153C66.1034 1030.04 76.1484 896.664 56.3541 767.332V767.332Z" fill="white" />
                    </svg>
                    <img src="/assets/login.jpg" alt="" />
                </div>
            </Fragment>}

            {registerSuccess && <Result
            status="success"
            title="Conta criada com sucesso!"
            subTitle="Pode entrar na sua conta com os dados fornecidos e começar a usufruir das funcionalidades."
            extra={[<Button key={1} text="Confirmar" click={context.closeModal} />]}
            /> }

        </div>

    )
}

export default LoginRegister