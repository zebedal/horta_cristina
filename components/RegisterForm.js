import  { useState, Fragment } from 'react';
import styles from './LoginForm.module.css'
import Button from '../components/UI/Button'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Spinner from '../components/UI/Spinner'
import { Result } from 'antd';


const RegisterForm = ({closeRegister}) => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(false)



    const onSubmit = async data => {
        console.log(data)
        setLoading(true)
        const result = await axios.post('/api/createUser', { data })
        setLoading(false)
    };

    return (


        <Fragment>
            {!loading && <Fragment>
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
                    <label htmlFor="password">Email:</label>
                    <input type="email" id="email" {...register("email", { required: true })} />
                    {errors?.password?.type === "required" && <p className={styles.error}>Por favor preencha o email</p>}
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