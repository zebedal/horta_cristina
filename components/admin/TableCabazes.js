import { Table, Space, Button, Modal, Form, Input, Upload, message, Spin, Popconfirm, Tooltip, Select, List } from 'antd';
/* import Image from 'next/image' */
import { EditOutlined, DeleteOutlined, UploadOutlined, PlusOutlined, SearchOutlined  } from '@ant-design/icons';
import { Fragment, useState } from 'react';
import axios from 'axios';
import React from 'react'
import { uploadImageCloudinary } from '../../lib/utils'

const { Search } = Input;




const TableCabazes = ({ cabazes, title, produtos }) => {


    const parsedCabazes = JSON.parse(cabazes)
    const parsedProducts = JSON.parse(produtos)

    const [tableData, setTableData] = useState(parsedCabazes)
    const [filteredData, setFilteredData] = useState(parsedCabazes)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [productModalVisible, setProductModalVisible] = useState(false)
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
    const [selectedRowData, setSelectedRowData] = useState({})
    const [selectedProductLabels, setSelectedProductLabels] = useState(null)
    const [selectedImage, setSelectedImage] = useState([])
    const [loadingData, setLoadingData] = useState(false)
    const [deleteLoadingData, setDeleteLoadingData] = useState(false)
    const [current, setCurrent] = useState(1)



    const [form] = Form.useForm()
    const [formCreate] = Form.useForm()

  
    const selectProductsOptions = parsedProducts.map(prod => {
        return {
            label: prod.nome,
            value: prod._id
        }
    })
    const sortedArr = selectProductsOptions.sort((a,b) => a.label > b.label ? 1 : -1)
   

    const showModal = rowData => {
        setSelectedRowData(rowData)
        setIsModalVisible(true)
    }

    const closeModal = () => {
        setIsModalVisible(false)
        setIsCreateModalVisible(false)
        setSelectedImage([])
    }

    const ProductsModalHandler = (rowData) => {
        setSelectedProductLabels(rowData.produtosLabels)
        setProductModalVisible(true)

    }

    const onChangeHandler = page => {
        setCurrent(page)
    }
    
    
    const onSearch = e => {
        const query = e.target.value
        const filteredData = tableData.filter(el => el.nome.toLowerCase().includes(query.toLowerCase()))
        setFilteredData(filteredData)
    }

    const createNewProductHandler = async (data) => {


        setLoadingData(true)

        let newImgUrl;

        if(newImgUrl || newImgUrl !== 'undefined') {
            newImgUrl = await uploadImageCloudinary(selectedImage)
        }
      
        
        const produtos = formCreate.getFieldValue('produtos').map(prod => prod.value)
        const produtosLabels = formCreate.getFieldValue('produtos').map(prod => prod.label)

        const obj = {
            nome: formCreate.getFieldValue('nome'),
            Preco: +formCreate.getFieldValue('preco'),
            produtos,
            produtosLabels,
            imgUrl: newImgUrl ? newImgUrl : "",
            collection: 'cabazes'
        }
        
        await axios.post('/api/createCabaz', obj)
        setLoadingData(false)
        closeModal()
        message.success('Cabaz criado com sucesso')
        formCreate.resetFields()

        const getUpdated = await axios.get('/api/getCabazes')
       
        setFilteredData(getUpdated.data)  
    }
    
    const submitModalData = async () => {
    
        setLoadingData(true)
        
        const newImgUrl = await uploadImageCloudinary(selectedImage)
    
        //guardar na base de dados
        let reqObj = { ...selectedRowData }
        if (newImgUrl) {
            reqObj = { ...reqObj, image_url: newImgUrl }
        }
    
        try {
            await axios.post('/api/updateProducts', reqObj)
            message.success('Produto actualizado com sucesso!')
        } catch (e) {
            message.error('Ocorreu um erro na actualização dos dados', e.message)
        }
    
        try {
            const getUpdated = await axios.post('/api/getProducts', {tipo: selectedRowData.tipo})
            setTableData(getUpdated.data) 
        } catch (e) {
            message.error('Ocorreu um erro na actualização dos dados da tabela', e.message)
        }
    
        setLoadingData(false)
        closeModal()
    
    }
    
    const changeInputHandler = e => {
        const newObj = { ...selectedRowData, [e.target.name]: e.target.value }
        setSelectedRowData(newObj)
    }
    
    const fileChangeHandler = e => {
    
        //validar o tamanho e formato da imagem
        const fileSize = e.file.size * Math.pow(10, -6)
        if (e.file.type !== 'image/jpeg' && e.file.type !== 'image/jpg' && e.file.type !== 'image/png') {
            message.error('A imagem apenas é permitida nos seguintes formatos: JPG, JPEG ou PNG')
            return
        }
    
        if (fileSize > 3) {
            message.error('O tamanho da imagem não pode ser superior a 3Mb')
            return
        }
    
        let fileList = [...e.fileList];
        fileList = fileList.slice(-1);
        setSelectedImage(fileList);
    
    }
    
    const deleteTableRow = async (id) => {
        setDeleteLoadingData(true)

        const obj = {
            id: id,
            collection: 'cabazes'
        }
        try {
            await axios.post('/api/deleteProduct', obj)
            const getUpdated = await axios.get('/api/getCabazes')
            message.success('Cabaz removido com sucesso!')
            setFilteredData(getUpdated.data)
            setDeleteLoadingData(false)
        } catch (e) {
            message.error('Ocorreu um erro ao remover o cabaz', e.message)
        }
    }


    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.nome > b.nome ? 1 : -1
        },
        {
            title: 'Preço',
            dataIndex: 'Preco',
            key: 'Preco',
           
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.preco - b.preco
        },
        {
            title: 'Produtos',
            dataIndex: 'produtosLabels',
            key: 'produtosLabels',
            render: (_, lista) => <Space size="small">
                <span style={{color:'#002766', fontSize:'12px'}}>Ver produtos</span>&nbsp;
                <SearchOutlined style={{ fontSize: '1.5em', color: '#002766', cursor:'pointer' }} onClick={() => ProductsModalHandler(lista)}   />
            </Space>
           
        },
        {
            title: 'Imagem',
            dataIndex: 'imgUrl',
            key: 'imgUrl',
            render: image => image ? <img src={image} /> : 'N/A'
        },
        {
            title: 'Ações',
            key: 'action',
            
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip title="Editar o produto"><EditOutlined onClick={() => showModal(record)} style={{ fontSize: '1.5em', color: '#002766' }} /></Tooltip>
                    <Popconfirm placement="top" title={"Tem a certeza que deseja remover o produto?"}
                        onConfirm={() => deleteTableRow(record['_id'])} okText="Sim" cancelText="Não">
                        <Tooltip title="Remover produto"> <DeleteOutlined style={{ fontSize: '1.5em', color: '#002766', cursor: 'pointer' }} /></Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ]




    return (
        <Fragment>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 50px', marginTop: '50px' }}>
                <h2>Listagem de {title}</h2>
                <Space size={30}>
                    <Search placeholder="Pesquisar..." onChange={onSearch} style={{ width: 200 }} />
                    <Button icon={<PlusOutlined />} type="primary" onClick={() => setIsCreateModalVisible(true)}>Criar novo</Button>
                </Space>
            </div>

            <br />
            {deleteLoadingData && <div style={{
                position: 'fixed', height: '100%', width: '100%', background: 'rgba(239, 239, 239, .9)', zIndex: '999999', display: 'flex',
                justifyContent: 'center'
            }}>
                <Spin size="large" tip="A remover produto, por favor aguarde..." style={{ marginTop: '50px', marginRight: '150px' }}></Spin>
            </div>}
            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey={"_id"}
                style={{ padding: '0 50px' }}
                size="small"
                pagination={{
                    defaultPageSize: 7,
                    onChange: onChangeHandler,
                    current
                }}
            />


        <Modal visible={isModalVisible} onOk={submitModalData} onCancel={closeModal} title="Editar produto" okText="Actualizar produto" cancelText="Cancelar">
            {loadingData && <Spin tip="A carregar dados..." style={{ display: 'block' }}></Spin>}
            {!loadingData && <Form layout="vertical">
                <Form.Item label="Nome">
                    <Input placeholder="Nome da fruta" name="nome" value={selectedRowData.nome} onChange={changeInputHandler} />
                </Form.Item>
                <Form.Item label="Preço"  >
                    <Input type="number" step="0.01" placeholder="Preço do cabaz" name="Preco" value={selectedRowData.Preco} onChange={changeInputHandler} min={0} />
                </Form.Item>
                <Upload onChange={fileChangeHandler} multiple={false} fileList={selectedImage} >
                    <Button icon={<UploadOutlined />}>Carregar nova imagem</Button>
                </Upload>
            </Form>}
        </Modal>

        <Modal visible={isCreateModalVisible} onOk={createNewProductHandler} onCancel={closeModal} title="Criar novo cabaz" okText="Criar" cancelText="Cancelar">
            {loadingData && <Spin tip="A carregar dados..." style={{ display: 'block' }}></Spin>}
            {!loadingData && <Form layout="vertical" form={formCreate} resetFields={fields => console.log(fields)} >
                <Form.Item label="Nome" name="nome" rules={[{required:true,message:'Nome é um campo obrigatório'}]} id="nome">
                    <Input /* placeholder="Nome do produto" */ name="nome" required />
                </Form.Item>
                <Form.Item label="Preço"  name="preco" rules={[{required:true,message:'Preço é um campo obrigatório'}]} id="preco">
                    <Input type="number" /* placeholder="Preço do produto" */ name="Preco"  min={0} required/>
                </Form.Item>
                <Form.Item label="Selecionar produtos para o cabaz" name="produtos" id="produtos"> 
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        /* placeholder="Selecionar" */
                        onChange={test => console.log(test)}
                        options={sortedArr}
                        optionFilterProp="label"
                        labelInValue
                        />  
                </Form.Item>
                <Upload onChange={fileChangeHandler} multiple={false} fileList={selectedImage} >
                    <Button icon={<UploadOutlined />}>Carregar nova imagem</Button>
                </Upload>
            </Form>}
        </Modal>

        <Modal visible={productModalVisible} 
        onCancel={() => setProductModalVisible(false)} 
        title="Produtos do cabaz" 
        footer={null}
        cancelText="Cancelar"> 
         <List
        dataSource={selectedProductLabels}
        renderItem={item => (
        <List.Item style={{fontSize:'12px'}}>
          {item}
        </List.Item>
      )} 
    />
        </Modal>

        </Fragment>
    )
}

export default TableCabazes

