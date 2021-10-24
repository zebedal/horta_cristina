import styles from './Hero.module.css'
import Image from 'next/image'
import Button from '../UI/Button'

const Hero = props => (
    <div className={`container-fluid ${styles.heroContainer}`}>
        <Image src="/assets/hero.jpg" loading="eager" priority layout="fill" objectFit="cover" alt="hero" />
        <div className={`container ${styles.Container}`}>
            <div className={styles.wrapper}>
                <h1>Da horta para o seu prato</h1>
                <p className={styles.subtitle}>Entregamos na sua residência</p>
                <Button text="VER CABAZES" background={false} marginTop={30} />
            </div>
        </div>
    </div>
)

export default Hero