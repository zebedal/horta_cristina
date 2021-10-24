import { Table, Space, Button, Modal, Form, Input, Upload, message, Spin, Popconfirm, Tooltip, Select } from 'antd';
import Image from 'next/image'
import { EditOutlined, DeleteOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { Fragment, useState } from 'react';
import axios from 'axios';
import React, { useEffect } from 'react'
import { uploadImageCloudinary } from '../../lib/utils'

const { Search } = Input;


const TableContent = ({ dados, title, filtro }) => {

    console.log(filtro)


    const parsedProducts = JSON.parse(dados)
    const defaultProducts = parsedProducts.filter(prod => prod.tipo === filtro)
    const categories = [...new Set(parsedProducts.map(prod => prod.tipo))]


    const [tableData, setTableData] = useState(defaultProducts)
    const [filteredData, setFilteredData] = useState(defaultProducts)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
    const [selectedRowData, setSelectedRowData] = useState({})
    const [selectedImage, setSelectedImage] = useState([])
    const [loadingData, setLoadingData] = useState(false)
    const [deleteLoadingData, setDeleteLoadingData] = useState(false)
    const [current, setCurrent] = useState(1)


    const [form] = Form.useForm()

    useEffect(() => {
        setFilteredData(defaultProducts)
        setCurrent(1)
    }, [filtro])


    const showModal = rowData => {
        setSelectedRowData(rowData)
        setIsModalVisible(true)
    }

    const closeModal = () => {
        setIsModalVisible(false)
        setIsCreateModalVisible(false)
        setSelectedImage([])
    }

    const createNewProductHandler = async () => {
        setLoadingData(true)

        const newImgUrl = await uploadImageCloudinary(selectedImage)

        const obj = {
            nome: form.getFieldValue('nome'),
            Preco: +form.getFieldValue('preco'),
            tipo: form.getFieldValue('categoria'),
            image_url: newImgUrl ? newImgUrl : ""
        }
        await axios.post('/api/createProduct', obj)
        setLoadingData(false)
        setIsCreateModalVisible(false)
        message.success('Produto criado com sucesso')

        const getUpdated = await axios.post('/api/getProducts', { tipo: obj.tipo })
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
            const getUpdated = await axios.post('/api/getProducts', { tipo: selectedRowData.tipo })
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
            collection: 'produtos'
        }
        try {
            await axios.post('/api/deleteProduct', obj)
            const getUpdated = await axios.post('/api/getProducts', {tipo: filtro})
            message.success('Produto removido com sucesso!')
            setFilteredData(getUpdated.data)
            setDeleteLoadingData(false)
        } catch (e) {
            message.error('Ocorreu um erro ao remover o produto', e.message)
        }

    }

    const onChangeHandler = page => {
        setCurrent(page)
    }


    const onSearch = e => {
        const query = e.target.value
        const filteredData = tableData.filter(el => el.nome.toLowerCase().includes(query.toLowerCase()))
        setFilteredData(filteredData)
    }

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            width: '25%',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.nome.localeCompare(b.nome)
        },
        {
            title: 'Preço',
            dataIndex: 'Preco',
            key: 'Preco',
            width: '25%',
            sorter: (a, b) => a.Preco - b.Preco
        },
        {
            title: 'Imagem',
            dataIndex: 'image_url',
            key: 'image_url',
            width: '25%',
            render: image => image ? <Image src={image} layout="fixed" width={60} height={50} alt="" /> : null
        },
        {
            title: 'Ações',
            key: 'action',
            width: '25%',
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
                        <Input type="number" step="0.01" placeholder="Preço da fruta" name="Preco" value={selectedRowData.Preco} onChange={changeInputHandler} min={0} />
                    </Form.Item>
                    <Upload onChange={fileChangeHandler} multiple={false} fileList={selectedImage} >
                        <Button icon={<UploadOutlined />}>Carregar nova imagem</Button>
                    </Upload>
                </Form>}
            </Modal>

            <Modal visible={isCreateModalVisible} onOk={createNewProductHandler} onCancel={closeModal} title="Criar produto" okText="Criar" cancelText="Cancelar">
                {loadingData && <Spin tip="A carregar dados..." style={{ display: 'block' }}></Spin>}
                {!loadingData && <Form layout="vertical" form={form} >
                    <Form.Item label="Nome" name="nome" rules={[{ required: true, message: 'Nome é um campo obrigatório' }]} id="nome">
                        <Input name="nome" required />
                    </Form.Item>
                    <Form.Item label="Preço" name="preco" rules={[{ required: true, message: 'Preço é um campo obrigatório' }]} id="preco">
                        <Input type="number" name="Preco" min={0} required />
                    </Form.Item>
                    <Form.Item label="Categoria do produto" id="categoria" name="categoria" initialValue="fruta">
                        <Select>
                            {categories.map(cat => <Select.Option key={cat} value={cat}>{cat}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Upload onChange={fileChangeHandler} multiple={false} fileList={selectedImage} >
                        <Button icon={<UploadOutlined />}>Carregar nova imagem</Button>
                    </Upload>
                </Form>}
            </Modal>

        </Fragment>
    )
}

export default TableContent

