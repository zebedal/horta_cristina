
import { Table, Space, Button, Input, DatePicker, Row, Tag } from 'antd';
import { Fragment, useState, useEffect } from 'react';
import 'moment/locale/pt';
import { SearchOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/pt_PT';


const { Search } = Input;
const { RangePicker } = DatePicker;

const columns = [
    {
        title: 'Nome',
        dataIndex: 'nome',
        key: 'nome',
        width: '15%',
        defaultSortOrder: 'ascend',
    },
    {
        title: 'Morada',
        dataIndex: 'moradaFacturacao',
        key: 'moradaFacturacao',
        width: '35%',
    },
    {
        title: 'Data',
        dataIndex: 'data',
        key: 'data',
        width: '15%',
        sorter: (a, b) => new Date(a.data) - new Date(b.data)
    },
    {
        title: 'Estado',
        dataIndex: 'estado',
        key: 'estado',
        width: '15%',
        render: tags => {
            const color = tags === 'concluida' ? 'green' : 'yellow'
            return (
                <Tag color={color}>{tags.toUpperCase()} </Tag>
            )
        }
    },
    {
        title: 'Factura',
        dataIndex: 'numFactura',
        key: 'numFactura',
        width: '20%',
    },
]

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

    console.log(btnStates)

    useEffect(() => {
        setTableData(dados)
        setFilteredData(dados)
    }, [])


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

        const filtered = filteredData.filter(el => {
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
            const filtered = filteredData.filter(el => {
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



    return (
        <Fragment>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 50px', marginTop: '50px' }}>
                <h2>Lista de {title}</h2>
            </div>
            <br />
            <Row style={{ padding: ' 0 50px' }} justify="space-between">
                <Space size={10}>
                    <span>Pesquisar por data:</span>
                    <RangePicker locale={locale} format="DD-MM-YYYY" onChange={rangePickerHandler} />
                    <Button type="primary" onClick={hojeFilterHandler} style={{ background: btnStates[0].selected ? 'green' : '#1890ff' }}>Hoje</Button>
                    <Button type="primary" onClick={(e) => dateFilterHandler(e, 'ontem')}>Ontem</Button>
                    <Button type="primary" onClick={() => dateFilterHandler('semana')}>Última Semana</Button>
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

            <pre>
                {JSON.stringify(filteredData, null, 2)}
            </pre>

        </Fragment>
    )
}

export default Encomendas