import styles from './Cabazes.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Plus from '../svg/Plus'

const Cabazes = props => {


    return (
        <div className="container" style={{textAlign:'center'}}>
            <div className={styles.flex}>
                <Link href="/encomendar-cabaz"  passHref>
                    <div className={styles.imgWrapper}>
                        <Image src="/assets/cabaz.jpg" layout="fill" objectFit="cover" alt="cabazes de fruta"/>
                        <div className={styles.content}>
                            <h3>Frutas & Legumes</h3>
                            <Plus color="white"/>
                        </div>
                    </div>
                </Link>
                <Link href="/encomendar-cabaz"  passHref>
                    <div className={styles.imgWrapper}>
                        <Image src="/assets/cabaz2.jpg" layout="fill" objectFit="cover" alt="entrega de cabazes"/>
                        <div className={styles.content}>
                            <h3>Personalizado</h3>
                            <Plus color="white"/>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Cabazes