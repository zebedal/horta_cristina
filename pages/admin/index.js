



import 'antd/dist/antd.css';
import { Menu, Layout, Button, Row } from 'antd';
import { UnorderedListOutlined , UserOutlined, AuditOutlined, LogoutOutlined   } from '@ant-design/icons';
import TableProdutos from '../../components/admin/TableProdutos';
import dynamic from 'next/dynamic'
import { dbConnect, getProdutos, getEncomendas } from '../../db-utils/db-connection';
import { useState } from 'react';
import {getSession, signOut} from 'next-auth/client'

const { Header, Footer, Sider, Content } = Layout;
const {SubMenu} = Menu


const Encomendas = dynamic(() => import('../../components/admin/Encomendas'))


const Backoffice = ({produtos, encomendas}) => {

    
    const [filter, setFilter] = useState("fruta")
    const [title, setTitle] = useState('frutas')
    
    
    const toggleContent = obj => {
        setTitle(obj.title)
        setFilter(obj.key)
    }

    const logoutHandler = () => {
       signOut()
    }

    console.log(title)
   
    return (

        <Layout>
            <Sider style={{paddingTop:'150px', height: '100vh', background: '#fff'}}>
                <Menu mode="inline" style={{}}>
                    <Menu.Item key="customers" icon={<UserOutlined />}>Lista de clientes</Menu.Item>
                    <SubMenu key="products" icon={<AuditOutlined />} title="Produtos">
                        <Menu.Item key="fruta" onClick={() => toggleContent({key:'fruta', title:'frutas'})}>Frutas</Menu.Item>
                        <Menu.Item key="vegetais" onClick={() => toggleContent({key:'vegetais', title:'vegetais'})}>Vegetais</Menu.Item>
                        <Menu.Item key="pao" onClick={() => toggleContent({key: 'pao', title:'pães & bolos'})}>Pães & Bolos</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="encomendas" onClick={() => toggleContent({key:'encomendas', title:'encomendas'})} icon={<UnorderedListOutlined />}>Encomendas</Menu.Item>
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
                    {filter !== 'encomendas' && <TableProdutos dados={produtos} title={title} filtro={filter} />}
                    {filter === 'encomendas' && <Encomendas dados={JSON.parse(encomendas)} title={title} /> }
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout> 

    )
}

export default Backoffice


export async function getServerSideProps(context) {


    console.log(context)
    const session = await getSession({req: context.req})

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const client = await dbConnect()
    const produtos = await getProdutos(client)
    const encomendas = await getEncomendas(client)

    

    return {
        props: {
            produtos: JSON.stringify(produtos),
            encomendas: JSON.stringify(encomendas)
        }
    }
}
