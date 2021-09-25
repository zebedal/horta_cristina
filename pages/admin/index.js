



import 'antd/dist/antd.css';
import { Menu, Layout, Modal } from 'antd';
import { UnorderedListOutlined , UserOutlined, AuditOutlined  } from '@ant-design/icons';
import TableContent from '../../components/admin/TableContent';
import { dbConnect, getProdutos } from '../../db-utils/db-connection';
import { useState } from 'react';

const { Header, Footer, Sider, Content } = Layout;
const {SubMenu} = Menu



const Backoffice = ({produtos}) => {

    const parsedProducts = JSON.parse(produtos)
    const defaultProducts = parsedProducts.filter(prod => prod.tipo === 'fruta')
    const categories = [...new Set(parsedProducts.map(prod => prod.tipo))]
    

    const [contentData, setContentData] = useState(defaultProducts)
    const [title, setTitle] = useState('frutas')
    
    

    const toggleContent = obj => {
        const filteredContent = parsedProducts.filter(prod => prod.tipo === obj.key)
        setContentData(filteredContent)
        setTitle(obj.title)
    }
   
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
                    <Menu.Item key="orders" icon={<UnorderedListOutlined  />}>Encomendas</Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{background:'#002766'}}>
                    <h1 style={{color:'white'}}>Horta Backoffice</h1>
                </Header>
                <Content>
                    <TableContent data={contentData} title={title} categorias={categories} />
                </Content>
                <Footer>Footer</Footer>
            </Layout>

            
        </Layout> 
    
    
       
    )
}

export default Backoffice


export async function getStaticProps() {

    const client = await dbConnect()
    const produtos = await getProdutos(client)


    return {
        props: {
            produtos: JSON.stringify(produtos)
        }
    }
}
