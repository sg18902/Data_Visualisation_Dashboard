import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import Exporting from 'highcharts/modules/exporting';
import { Box } from '@mui/material';
import axios from 'axios';
import CLVColumnChart from './CLVColumnChart';

// Initialize modules
HighchartsMore(Highcharts);
HighchartsAccessibility(Highcharts);
Exporting(Highcharts);

const CLVlinechart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/clv/cohorts`); // Replace with your API endpoint
                const apiData = response.data;

                // Transform API data
                const chartData = apiData.map(item => ({
                    cohort: item._id,
                    totalRevenue: item.totalRevenue,
                    customerCount: item.customerCount,
                    clv: item.clv
                }));

                setData(chartData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Prepare chart options
    const chartOptions = {
        title: {
            text: 'Customer Lifetime Metrics Over Time',
            style: {
                color: '#333333',
                fontSize: '18px',
                fontWeight: 'bold'
            }
        },
        xAxis: {
            categories: data.map(d => d.cohort),
            title: {
                text: 'Cohort (Month)',
                style: {
                    color: '#666666'
                }
            },
            labels: {
                style: {
                    color: '#666666'
                }
            },
            tickWidth: 0,
        },
        yAxis: [
            {
                title: {
                    text: 'CLV',
                    style: {
                        color: '#666666'
                    }
                },
                labels: {
                    style: {
                        color: '#666666'
                    }
                },
                gridLineColor: '#e0e0e0'
            },
            {
                title: {
                    text: 'Total Revenue & Customers',
                    style: {
                        color: '#666666'
                    }
                },
                labels: {
                    style: {
                        color: '#666666'
                    }
                },
                opposite: true,
                gridLineColor: '#e0e0e0'
            }
        ],
        series: [
            {
                name: 'CLV',
                data: data.map(d => d.clv),
                color: '#7cb5ec',
                yAxis: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}', // Display with 1 decimal point
                    style: {
                        color: '#333333',
                        textOutline: 'none'
                    }
                }
            },
            {
                name: 'Total Revenue',
                data: data.map(d => d.totalRevenue),
                color: '#434348',
                yAxis: 1,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}',
                    style: {
                        color: '#333333',
                        textOutline: 'none'
                    }
                }
            },
            {
                name: 'Total Customers',
                data: data.map(d => d.customerCount),
                color: '#90ed7d',
                yAxis: 1,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.0f}',
                    style: {
                        color: '#333333',
                        textOutline: 'none'
                    }
                }
            }
        ],
        tooltip: {
            formatter: function() {
                const pointIndex = this.point.index; // Index of the current point
                const clv = this.series.chart.series[0].data[pointIndex].y;
                const totalRevenue = this.series.chart.series[1].data[pointIndex].y;
                const customerCount = this.series.chart.series[2].data[pointIndex].y;

                return `
                    <strong>Cohort:</strong> ${this.x}<br/>
                    <strong>CLV:</strong> ${Highcharts.numberFormat(clv, 1)}<br/>
                    <strong>Total Revenue:</strong> ${Highcharts.numberFormat(totalRevenue, 1)}<br/>
                    <strong>Total Customers:</strong> ${Highcharts.numberFormat(customerCount, 0)}
                `;
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        chart: {
            type: 'line',
            zoomType: 'x',
            panning: true,
            panKey: 'shift',
            style: {
                cursor: 'crosshair'
            }
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: true,
            buttons: {
                contextButton: {
                    menuItems: ['viewFullscreen', 'printChart']
                }
            }
        }
    };

    return (
        <Box sx={{ padding: '1rem', backgroundColor: 'white', borderRadius: 3, boxShadow: 4 }}>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Box>
    );
};

export default CLVlinechart;
