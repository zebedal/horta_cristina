



import 'antd/dist/antd.css';
import { Menu, Layout } from 'antd';
import { UnorderedListOutlined , UserOutlined, AuditOutlined  } from '@ant-design/icons';
import Products from '../../components/admin/Products';
import { dbConnect, getFrutas } from '../../db-utils/db-connection';

const { Header, Footer, Sider, Content } = Layout;

const Backoffice = ({prods}) => {

    const parsedData = JSON.parse(prods)


    return (

        <Layout>
            <Sider style={{paddingTop:'150px', height: '100vh', background: '#fff'}}>
                <Menu mode="inline" style={{}}>
                    <Menu.Item key="customers" icon={<UserOutlined />}>Lista de clientes</Menu.Item>
                    <Menu.Item key="products" icon={<AuditOutlined  />}>Produtos</Menu.Item>
                    <Menu.Item key="orders" icon={<UnorderedListOutlined  />}>Encomendas</Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{background:'#002766'}}>
                    <h1 style={{color:'white'}}>Horta Backoffice</h1>
                </Header>
                <Content>
                    <Products data={parsedData} />
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout> 
    

       
    )
}

export default Backoffice


export async function getStaticProps() {

    const client = await dbConnect()
    const frutas = await getFrutas(client)


    return {
        props: {
            prods: JSON.stringify(frutas)
        }
    }
}
