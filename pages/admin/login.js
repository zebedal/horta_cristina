import { Layout, Row, Col, Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
const { Header,  Content } = Layout;
import {signIn} from 'next-auth/client'
import {useState} from 'react'


const Login = props => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({status: false, text: ""})

    const onFinish = async (values) => {
        setLoading(true)
        const result = await signIn('credentials', {
            redirect: false,
            nome: values.username,
            password: values.password
        })
        if(result.error) {
            setError({status: true, text: result.error})
            setLoading(false)
        }
        if(!result.error) {
            window.location.href = '/admin'
        }

    };
    

    return (
        <Layout>
            <Header style={{ background: '#002766', textAlign: 'center', height:'80px' }} align="middle">
                <h1 style={{ color: 'white' }}>Login</h1>
            </Header>
            <Content>
            <Row align="middle" justify="center" style={{height:'calc(100vh - 80px)', padding:'0 20px'}} >
                    <Col xs={{span:24}} md={{span:16}} lg={{span:12}}>
                        {error.status && <Col offset={8}><p style={{color:'red'}}>{error.text}</p></Col>}
                        <Form
                            wrapperCol={{span:12}}
                            labelCol={{ span: 8 }}
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Por favor inserir o nome!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Por favor inserir password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item wrapperCol={{ sm:{offset:8}}}>
                                <Button type="primary" htmlType="submit" loading={loading ? true : false} >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>

                    </Col>
                </Row>

            </Content>
            
        </Layout>
    )
}


export default Login