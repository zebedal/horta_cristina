import  { useState, Fragment } from 'react';
import styles from './LoginForm.module.css'
import Button from '../UI/Button'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Spinner from '../UI/Spinner'



const RegisterForm = ({closeRegister, success}) => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(false)
    const [registerError, setRegisterError] = useState(false)
   

    const onSubmit = async data => {
        setLoading(true)
        const result = await axios.post('/api/createUser', { data })
        if(!result.data.ok) {
            setRegisterError(true)
            setLoading(false)
        }
        setLoading(false)
        success()
    };

    return (


        <Fragment>
            {!loading  && <Fragment>
            <h3>Bem vindo à horta da Sandrinha</h3>
            <p style={{fontSize: '12px'}}>Criar a sua conta grátis</p>
            <br />

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formControl}>
                    <label htmlFor="username">Nome:</label>
                    <input type="text" id="username" {...register("username", { required: true })} />
                    {errors?.username?.type === "required" && <p className={styles.error}>Por favor preencha o nome</p>}
                </div>
                <br />
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
                <Button text="Registar" marginTop={25} tipo="submit" /* click={submitFormHandler}  */ />
                <br />
            <br />
                <p style={{ fontSize: '12px' }}>Já é nosso cliente? <a href="#" onClick={closeRegister} style={{textDecoration:'underline'}}>Entrar</a></p>
            </form>
            </Fragment>}
            { loading && <Spinner width={30} height={30} text="A criar a sua conta.." /> }
        
        </Fragment>

    )
}

export default RegisterForm