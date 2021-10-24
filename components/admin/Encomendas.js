
import { Table, Space, Button, Input, DatePicker, Row, Tag, Select } from 'antd';
import { Fragment, useState, useEffect } from 'react';
import 'moment/locale/pt';
import { SearchOutlined } from '@ant-design/icons';
/* import locale from 'antd/es/date-picker/locale/pt_PT'; */
import Invoice from '../Invoice';
import Pdf from '../svg/Pdf'
import {PDFDownloadLink } from '@react-pdf/renderer'
import {invoiceData} from '../../dummy-data/invoice'
import Contagem from '../Contagem';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;


const buttonStates = [
    {
        btn: 'hoje',
        selected: false
    },
    {
        btn: 'ontem',
        selected: false
    },
    {
        btn: 'semana',
        selected: false
    }
]


const Encomendas = ({ dados, title }) => {


    const [tableData, setTableData] = useState([])
    const [current, setCurrent] = useState(1)
    const [filteredData, setFilteredData] = useState([])
    const [btnStates, setbtnStates] = useState(buttonStates)
    const [loading, setloading] = useState(true)
   

    useEffect(() => {
        const sortedData = dados.sort((a,b) => b.data.localeCompare(a.data))

       
        setTableData(dados)
        setFilteredData(sortedData)
        setloading(false)
    }, [])

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            defaultSortOrder: 'ascend',
        },
        {
            title: 'Morada',
            dataIndex: 'moradaFacturacao',
            key: 'moradaFacturacao'
            
        },
        {
            title: 'Data',
            dataIndex: 'data',
            key: 'data'
            
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            render: estado => {
                return (
                    <Select defaultValue={estado} style={{width:'140px'}}>
                        <Option value="pendente"> <Tag color="yellow">{"Pendente".toUpperCase()}</Tag></Option>
                        <Option value="concluida"><Tag color="green">{"Concluída".toUpperCase()}</Tag></Option>
                        <Option value="cancelada" ><Tag color="red">{"Cancelada".toUpperCase()}</Tag></Option>
                    </Select>
                )
            }
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: total => total+'€'
        },
        {
            title: 'Factura',
            dataIndex: 'numFactura',
            key: 'numFactura'
       
        },
        {
            title: 'Download',
            key:'pdf',
            render: (_, record) => <PDFDownloadLink document={<Invoice invoice={invoiceData} />}><Pdf/></PDFDownloadLink>
        }
    ]

    const handlePdf = (rowData) => {
        console.log(rowData)
    }


    const onSearch = e => {
        if (e.target) {
            const query = e.target.value
            const filteredData = tableData.filter(el => {
                return el.nome.toLowerCase().includes(query.toLowerCase()) ||
                    el.moradaFacturacao.toLowerCase().includes(query.toLowerCase()) || el.numFactura.toString().includes(query)
            })
            setFilteredData(filteredData)
        }
    }

    const onChangeHandler = page => {
        setCurrent(page)
    }

    const rangePickerHandler = (values, dateString) => {

        if (!values) {
            setFilteredData(tableData)
            return
        }
        const dataInicio = dateString[0]
        const dataFim = dateString[1]

        const filtered = tableData.filter(el => {
            const parsedData = Date.parse(el.data)
            return parsedData >= Date.parse(dataInicio) && parsedData <= Date.parse(dataFim)
        })

        setFilteredData(filtered)
    }

    const hojeFilterHandler = () => {

        //desligar todos os botos menos este
        const f = btnStates.map(obj => {
            if (obj.btn === 'hoje') return { ...obj, selected: !obj.selected }
            return { ...obj, selected: false }
        })

        if (!btnStates[0].selected) {
            const today = new Date().toLocaleDateString('pt-PT')
            const filtered = tableData.filter(el => {
                const d = el.data.replace(/-/g, "/")
                return d === today
            })
            setFilteredData(filtered)
            setbtnStates(f)
        } else {
            setFilteredData(tableData)
            setbtnStates(f)
        }
        
    }

    const ontemFilterHandler = () => {
       
         const f = btnStates.map(obj => {
            if (obj.btn === 'ontem') return { ...obj, selected: !obj.selected }
            return { ...obj, selected: false }
        })

        let today = new Date()
        let yesterday = new Date()
        yesterday.setDate(today.getDate()-1)
        const wtf = yesterday.toLocaleDateString('pt-PT')

        if (!btnStates[1].selected) {
            const filtered = tableData.filter(el => {
                const d = el.data.replace(/-/g, "/")
                return d === wtf
            })
            setFilteredData(filtered)
            setbtnStates(f)
        } else {
            setFilteredData(tableData)
            setbtnStates(f)
        }
        
    }

    const semanaFilterhandler = () => {
        const f = btnStates.map(obj => {
            if (obj.btn === 'semana') return { ...obj, selected: !obj.selected }
            return { ...obj, selected: false }
        })

        let today = new Date()
        let semana = new Date()
        semana.setDate(today.getDate()-7)
        const td = today.toLocaleDateString('pt-PT')
        const sem = semana.toLocaleDateString('pt-PT')

        if (!btnStates[2].selected) {
            const filtered = tableData.filter(el => {
                const d = el.data.replace(/-/g, "/")
                return d > sem && d < td
            })
            filtered.sort((a, b) => new Date(a.data) - new Date(b.data))
            setFilteredData(filtered)
            setbtnStates(f)
        } else {
            setFilteredData(tableData)
            setbtnStates(f)
        }
    }


    return (
        <Fragment>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 50px', marginTop: '50px' }}>
                <h2>Lista de {title}</h2>
            </div>
            <br />
            <Row style={{ padding: ' 0 50px' }} justify="space-between">
                <Space size={10}>
                    <span>Pesquisar por data:</span>
                    <RangePicker /* locale={locale} */ format="DD-MM-YYYY" onChange={rangePickerHandler} />
                    <Button type="primary" onClick={hojeFilterHandler} style={{ background: btnStates[0].selected ? 'green' : '#1890ff' }}>Hoje</Button>
                    <Button type="primary" onClick={ontemFilterHandler} style={{ background: btnStates[1].selected ? 'green' : '#1890ff' }}>Ontem</Button>
                    <Button type="primary" onClick={semanaFilterhandler} style={{ background: btnStates[2].selected ? 'green' : '#1890ff' }}>Última Semana</Button>
                </Space>
                <Search
                    placeholder="Pesquisar..."
                    allowClear
                    enterButton={<SearchOutlined />}
                    size="medium"
                    onChange={onSearch}
                    style={{ width: 200 }}
                    onSearch={onSearch}
                />
            </Row>

            <br />

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

            
            
           {filteredData.length > 0 && <PDFDownloadLink document={<Contagem data={filteredData} />}>PDF test</PDFDownloadLink>}


        </Fragment>

        
    )
}

export default Encomendas