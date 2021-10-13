import styles from './DashboardOverview.module.css'
import {EuroOutlined, ShopOutlined, ShoppingCartOutlined, AlertOutlined   } from '@ant-design/icons'
import { Divider } from 'antd';


const DashboardOverview = props => {


    return (
        <div className={styles.wrapper}>
            <h3>Resumo</h3>
            <Divider style={{margin:'12px 0'}}/>
            <div className={styles.row}>
                <EuroOutlined style={{fontSize:'30px', color:'#002766'}} />
                <div className={styles.content}>
                    <p className={styles.valor}>10.500,00€</p>
                    <p className={styles.desc}>Vendas líquidas este mês</p>
                </div>
            </div>
            <Divider style={{margin:'12px 0'}}/>
            <div className={styles.row}>
                <ShopOutlined  style={{fontSize:'30px', color:'#002766'}} />
                <div className={styles.content}>
                    <p className={styles.valor} >Cabaz de frutas e legumes médio</p>
                    <p className={styles.desc}>Produto mais vendido este mês <span>84 vendidos</span></p>
                </div>
            </div>
            <Divider style={{margin:'12px 0'}}/>
            <div className={styles.row}>
                <ShoppingCartOutlined  style={{fontSize:'30px', color:"green"}} />
                <div className={styles.content}>
                    <p className={styles.valor} style={{color:'green'}}>2 Encomendas</p>
                    <p className={styles.desc}>Encomendas a aguardar processamento</p>
                </div>
            </div>
            <Divider style={{margin:'12px 0'}}/>
            <div className={styles.row}>
                <AlertOutlined  style={{fontSize:'30px', color:"red"}} />
                <div className={styles.content}>
                    <p className={styles.valor} style={{color:'red'}}>0 Cancelamentos</p>
                    <p className={styles.desc}>Encomendas canceladas</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardOverview  