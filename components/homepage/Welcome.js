import styles from './Welcome.module.css'
import Organic from '../svg/Organic'
import Quality from '../svg/Quality'
import Delivery from '../svg/Delivery'

const Welcome = props => (
    <div className={`container ${styles.flex}`}>
        <div className={styles.imgWrapper}>
            <img src="/assets/image.png" alt="entrega de vegetais ao domicilio" />
        </div>
        <div>
            <h2 className="subtitles">Bem vindos à horta da Sandrinha</h2>
            <p>Nisi voluptate velit laborum occaecat non exercitation nisi ullamco et magna officia sit sint. Ullamco exercitation laborum fugiat tempor duis irure ex exercitation. Velit sit ad et adipisicing nisi deserunt veniam Lorem eu.</p>
            <div className={styles.grid}>

                <div className={styles.gridBox}>
                        <Organic />
                        <div>
                            <p className={styles.gridBoxTitle}>100% Orgânico</p>
                            <p className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adi</p>
                        </div> 
                </div>
                <div className={styles.gridBox}>
                        <Quality />
                        <div>
                        <p className={styles.gridBoxTitle}>Garantia de Qualidade</p>
                            <p className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adi</p>
                        </div> 
                </div>
                <div className={styles.gridBox}>
                        <Delivery />
                        <div>
                        <p className={styles.gridBoxTitle}>Entregamos em casa</p>
                        <p className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adi</p>
                        </div> 
                </div>
                <div className={styles.gridBox}>
                        <Organic />
                        <div>
                        <p className={styles.gridBoxTitle}>100% Orgânico</p>
                            <p className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adi</p>
                        </div> 
                </div>
               
            </div>
        </div>

    </div>
)

export default Welcome