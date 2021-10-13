import styles from './Button.module.css'

const Button = ({text, marginTop, click, tipo="text", secondary = false}) =>  {

    

    if(secondary) {
        return <button type={tipo} className={`${styles.Button} ${styles.secondary}`} style={{marginTop: `${marginTop}px`}} onClick={click}>{text}</button>
    }
    return <button type={tipo} className={styles.Button} style={{marginTop: `${marginTop}px`}} onClick={click}>{text}</button>
    
}

export default Button