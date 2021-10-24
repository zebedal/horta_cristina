



import 'antd/dist/antd.css';
import { Menu, Layout, Button, Row, Spin } from 'antd';
import { UnorderedListOutlined , UserOutlined, AuditOutlined, LogoutOutlined, BarChartOutlined, ShoppingCartOutlined  } from '@ant-design/icons';
import TableProdutos from '../../components/admin/TableProdutos';
import dynamic from 'next/dynamic'
import { dbConnect, getProdutos, getEncomendas, getCabazes } from '../../db-utils/db-connection';
import { useState } from 'react';
import {getSession, signOut} from 'next-auth/client'
import Dashboard from '../../components/admin/Dashboard';
import TableCabazes from  '../../components/admin/TableCabazes'

const { Header, Footer, Sider, Content } = Layout;
const {SubMenu} = Menu


const Encomendas = dynamic(() => import('../../components/admin/Encomendas'), {loading: () => <Spin 
    size="large" tip="A carregar encomendas..." style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }}></Spin>} )


const Backoffice = ({produtos, encomendas, cabazes}) => {

    
    const [filter, setFilter] = useState("")
    const [title, setTitle] = useState('frutas')
    const [activeContent, setActiveContent] = useState("dashboard")
    
    
    const toggleContent = obj => {
        setActiveContent(obj.content)
        setFilter(obj.key)
        setTitle(obj.title)  
    }

    const logoutHandler = () => {
       signOut()
    }
   
    
    return (

        <Layout style={{minHeight:'100vh'}}>
            <Sider style={{paddingTop:'150px', background: '#fff'}}>
                <Menu mode="inline" style={{}}>
                    <Menu.Item key="dashboard" icon={<BarChartOutlined />} onClick={() => toggleContent({content:'dashboard', key:"dashboard", title:'Dashboard'})}>Dashboard</Menu.Item>
                    <Menu.Item key="cabazes" icon={<ShoppingCartOutlined />} onClick={() => toggleContent({content:'cabazes', key:"cabazes", title:'Cabazes'})}>Cabazes</Menu.Item>
                    <Menu.Item key="customers" icon={<UserOutlined />}>Lista de clientes</Menu.Item>
                    <SubMenu key="products" icon={<AuditOutlined />} title="Produtos">
                        <Menu.Item key="fruta" onClick={() => toggleContent({content:'produtos', key:'fruta', title:'frutas'})}>Frutas</Menu.Item>
                        <Menu.Item key="vegetais" onClick={() => toggleContent({content:'produtos', key:'vegetais', title:'vegetais'})}>Vegetais</Menu.Item>
                        <Menu.Item key="pao" onClick={() => toggleContent({content:'produtos', key: 'pao', title:'pães & bolos'})}>Pães & Bolos</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="encomendas" onClick={() => toggleContent({content:'encomendas', key:"encomendas",  title:'encomendas'})} icon={<UnorderedListOutlined />}>Encomendas</Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{background:'#002766'}}>
                    <Row align="middle" justify="space-between">
                        <h1 style={{color:'white'}}>Horta Backoffice</h1>
                        <Button icon={<LogoutOutlined />} type="primary" color={'red'} onClick={logoutHandler}>Logout</Button>
                    </Row>
                </Header>
                <Content>
                    {activeContent === 'produtos' && <TableProdutos dados={produtos} title={title} filtro={filter} />}
                    {activeContent === 'encomendas' && <Encomendas dados={JSON.parse(encomendas)} title={title} /> }
                    {activeContent === 'dashboard' && <Dashboard /> }
                    {activeContent === 'cabazes' && <TableCabazes cabazes={cabazes} produtos={produtos} title="cabazes"/> }
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout> 

    )
}

export default Backoffice


export async function getServerSideProps(context) {


    const session = await getSession({req: context.req})

    if (!session) {
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false
            }
        }
    }

    let client = await dbConnect()
    const produtos = await getProdutos(client)
    const encomendas = await getEncomendas(client)
    const cabazes = await getCabazes(client)
   
    client.close()

    return {
        props: {
            produtos: JSON.stringify(produtos),
            encomendas: JSON.stringify(encomendas),
            cabazes: JSON.stringify(cabazes),

        }
    }
}
