import { Table, Space, Button, Modal, Form, Input, Upload, message, Spin } from 'antd';
import Image from 'next/image'
import { EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Fragment, useState } from 'react';
import axios from 'axios';

const Products = ({ data }) => {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedRowData, setSelectedRowData] = useState({})
    const [selectedImage, setSelectedImage] = useState(null)
    const [loadingData, setLoadingData] = useState(false)

    const showModal = rowData => {
        setSelectedRowData(rowData)
        setIsModalVisible(true)
    }

    const closeModal = () => {
        setIsModalVisible(false)
    }

    const submitModalData = async () => {

        //upload image to cloudinary
        const formData = new FormData()
        formData.append('file', selectedImage[0].originFileObj)
        formData.append('upload_preset', "hyki21aw")
        formData.append('folder', "produtos")


        setLoadingData(true)
        try {
            const res = await axios.post('https://api.cloudinary.com/v1_1/sergio-paulo-neves/image/upload', formData)
        } catch(error) {
            message.error('Ocorreu um erro no carregamento da imagem!', error)
        }
    
        setLoadingData(false)
        
        /*  setIsModalVisible(false) */
    }

    const changeInputHandler = e => {
        const newObj = {...selectedRowData, [e.target.name]: e.target.value}
        setSelectedRowData(newObj)
    }

    const fileChangeHandler = e => {

        //validar o tamanho e formato da imagem

        let fileList = [...e.fileList];
        fileList = fileList.slice(-1);
        setSelectedImage(fileList); 

        
    }


    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            width: '25%',
        },
        {
            title: 'Preço',
            dataIndex: 'Preco',
            key: 'Preco',
            width: '25%',
        },
        {
            title: 'Imagem',
            dataIndex: 'image_url',
            key: 'image_url',
            width: '25%',
            render: image => <Image src={image} layout="fixed" width={60} height={50} />
        },
        {
            title: 'Action',
            key: 'action',
            width: '25%',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" icon={<EditOutlined />} size="medium" shape="round" onClick={() => showModal(record)} >
                        Editar
                    </Button>
                    <Button danger type="text" icon={<DeleteOutlined />} size="medium">
                        Apagar
                    </Button>
                </Space>
            ),
        },
    ]

   
    return (
        <Fragment>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={"_id"}
                style={{ padding: '25px' }}
                size="small"
                pagination={{ pageSize: 7 }}
            />

            <Modal visible={isModalVisible} onOk={submitModalData} onCancel={closeModal} title="Editar produto">

                {loadingData && <Spin tip="A carregar imagem..." style={{display:'block'}}></Spin>}
                {!loadingData && <Form layout="vertical">
                    <Form.Item label="Nome">
                        <Input  placeholder="Nome da fruta" name="nome"  value={selectedRowData.nome} onChange={changeInputHandler} />
                    </Form.Item>
                    <Form.Item label="Preço"  >
                        <Input type="number" placeholder="Preço da fruta" name="Preco" value={selectedRowData.Preco} onChange={changeInputHandler} min={0}/>
                    </Form.Item>
                    <Upload onChange={fileChangeHandler} multiple={false} fileList={selectedImage} >
                        <Button icon={<UploadOutlined />}>Carregar nova imagem</Button>
                    </Upload>
                   
                </Form>}
                
            </Modal>


        </Fragment>
    )
}

export default Products

