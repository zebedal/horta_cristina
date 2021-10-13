import dynamic from 'next/dynamic'
import { Row, Col, Card } from 'antd';
import { Fragment } from 'react';
import DashboardOverview from './DashboardOverview';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Dashboard = props => {

    const options = {
        series: [44, 55, 13, 33],
        chartOptions: {
            labels: ['Cabaz frutas', 'Cabaz frutas e legumes grande ', 'Cabaz frutas e legumes 10 produtos', 'Cabaz frutas e legumes médio'],
            legend: {
                show: true,
                showForSingleSeries: false,
                showForNullSeries: true,
                showForZeroSeries: true,
                position: 'bottom',
                horizontalAlign: 'center',
                floating: false,
                fontSize: '11px',
                fontFamily: 'Helvetica, Arial',
                fontWeight: 400
            },
            title: {
                text: 'Vendas por volume',
                style: {
                    fontSize: '12px'
                }
            },
            chart: {
                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                    },
                }
            },
        }
    }

    const barChartOptions = {
        options: {
            legend: {
                show: true,
                fontSize: '11px',
                labels: {
                    useSeriesColors: false
                },
                markers: {
                    fillColors: ['#1890ff', '#30b284', '#10800C', '#feb019', '#1c3c6b', '#ff4560']
                }
            },
            chart: {
                redrawOnParentResize: true,
                background: '#fff',
                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: false,
                        reset: true
                    },
                },
                zoom: {
                    enabled: true
                },
                width: "100%",
                type: "bar",
                stacked: true,
            },
            title: {
                text: 'Vendas por produto',
                style: {
                    fontSize: '12px'
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    barHeight: '40px',
                    /*borderRadius: 20*/
                }
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                colors: ['#1890ff', '#30b284', '#10800C', '#feb019', '#1c3c6b', '#ff4560']
            },
            xaxis: {
                categories: ['Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev'],
                tickPlacement: 'on',

            }
        },
        series: [
            {
                name: 'Cabaz A',
                data: [44, 55, 41, 67, 22, 43]
            },
            {
                name: 'Cabaz B',
                data: [13, 23, 20, 8, 13, 27]
            },
            {
                name: 'Cabaz C',
                data: [11, 17, 15, 15, 21, 14]
            },
            {
                name: 'Cabaz D',
                data: [21, 7, 25, 13, 22, 8]
            },
            {
                name: 'Cabaz E',
                data: [21, 7, 25, 13, 22, 8]
            },
            {
                name: 'Cabaz F',
                data: [21, 7, 25, 13, 22, 8]
            }

        ]
    }

    const lineChartOptions = {
        series: [{
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        options: {
          chart: {
              
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'Variação das vendas',
            align: 'left',
            style: {
                fontSize: '12px'
            }
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Sep', 'Out'],
          }
        },
    }

    return (

        <Fragment>
            
            <Row style={{ padding: '20px 50px', maxWidth: '100%' }} gutter={24}>
                <Col md={10} sm={24}>
                    <Card style={{ width: '100%', height: '400px' }}>
                        <Chart
                            options={options.chartOptions}
                            series={options.series}
                            type="pie"
                            width="100%"
                            height="350px"
                        />
                    </Card>
                </Col>
                <Col md={14} sm={24}>
                    <Card style={{ width: '100%', height: '400px' }}>
                        <Chart
                            options={barChartOptions.options}
                            series={barChartOptions.series}
                            type="bar"
                            width="100%"
                            height="350px"
                        />
                    </Card>
                </Col>
            </Row>
            <Row style={{ padding: '0px 50px', maxWidth: '100%' }} gutter={24}>
                 <Col md={10} sm={24}>
                    <Card style={{ width: '100%'}}>
                        <DashboardOverview />
                    </Card>
                 </Col>

                 <Col md={14} sm={24}>
                    <Card style={{ width: '100%'}}>
                    <Chart
                            options={lineChartOptions.options}
                            series={lineChartOptions.series}
                            type="line"
                            width="100%"
                            height="350px"
                        />
                    </Card>
                 </Col>
            </Row>
            
        </Fragment>

    )
}

export default Dashboard