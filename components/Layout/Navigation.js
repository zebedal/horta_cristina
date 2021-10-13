import Link from 'next/link'
import styles from './Navigation.module.css'
import { useState } from 'react'


const Navigation = () => {

    const [active, setActive] = useState(1)

    return (
        <nav className={styles.Navigation}>
        <Link href="/"><a className={`${active === 1 ? styles.active : ''}`} onClick={() => setActive(1)}>Sobre Nós</a></Link>
        <Link href="/"><a className={`${active === 2 ? styles.active : ''}`} onClick={() => setActive(2)}>Como funciona</a></Link>
        <Link href="/"><a className={`${active === 3 ? styles.active : ''}`} onClick={() => setActive(3)}>Entregas</a></Link>
        <Link href="/"><a className={`${active === 4 ? styles.active : ''}`} onClick={() => setActive(4)}>Contactos</a></Link>
    </nav>
    )
}
    


export default Navigation