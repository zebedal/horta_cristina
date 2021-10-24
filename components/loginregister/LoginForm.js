import { Fragment, useState, useContext } from 'react'
import Button from '../UI/Button'
import { useForm } from 'react-hook-form';
import { message } from 'antd';
import styles from './LoginForm.module.css'
import Spinner from '../UI/Spinner';
import {signIn} from 'next-auth/client'
import ModalContext from '../../store/modal-context'
import AuthContext from '../../store/auth-context';

const LoginForm = ({openRegister}) => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(false)

    const {closeModal} = useContext(ModalContext)
    const {logIn} = useContext(AuthContext)

    const onSubmit = async data => {

        setLoading(true)
        const result = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
            userType: 'client'
        })
    
        if(result.error) {
            message.error(result.error)
            setLoading(false)
        } else {
            setLoading(false)
            closeModal()
            logIn()
        }
        
    };

  
    return (
        <Fragment>

            {!loading && <Fragment>
                <h3>Entrar na sua conta</h3>
                <br />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formControl}>
                        <label htmlFor="email">Email:</label>
                        <input  id="email" {...register("email", { required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/})} />
                        {errors?.email?.type === "required" && <p className={styles.error}>Por favor preencha o email</p>}
                        {errors?.email?.type === "pattern" && <p className={styles.error}>O email não é válido</p>}
                       
                    </div>
                    <br />
                    <div className={styles.formControl}>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" {...register("password", { required: true })} />
                        {errors?.password?.type === "required" && <p className={styles.error}>Por favor preencha a password</p>}
                    </div>
                    <Button text="Entrar" marginTop={25} tipo="submit" /* click={submitFormHandler}  */ />

                </form>
                <br />
                <br />
                <p style={{ fontSize: '12px' }}>Não é nosso cliente? <a href="#" onClick={openRegister} style={{textDecoration:'underline'}}>Registar-se</a></p>
            </Fragment>}
            { loading && <Spinner width={30} height={30} text="A validar dados.." /> }
        </Fragment>
         
    )
}

export default LoginForm