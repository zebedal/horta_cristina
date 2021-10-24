import styles from './Button.module.css'

const Button = ({text, marginTop, click, tipo="text", secondary = false, background=true}) =>  {

    if(!background) {
        return <button type={tipo} className={`${styles.Button} ${styles.nobg}`} style={{marginTop: `${marginTop}px`}} onClick={click}>{text}</button>
    }

    if(secondary) {
        return <button type={tipo} className={`${styles.Button} ${styles.secondary}`} style={{marginTop: `${marginTop}px`}} onClick={click}>{text}</button>
    }
    return <button type={tipo} className={styles.Button} style={{marginTop: `${marginTop}px`}} onClick={click}>{text}</button>
    
}

export default Button