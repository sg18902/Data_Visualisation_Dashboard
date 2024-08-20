import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import Exporting from 'highcharts/modules/exporting';
import { Box } from '@mui/material';
import axios from 'axios';

// Initialize modules
HighchartsMore(Highcharts);
HighchartsAccessibility(Highcharts);
Exporting(Highcharts);

const CLVColumnChart = () => {
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
            text: 'Customer Lifetime Value by Cohorts',
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
        yAxis: {
            title: {
                text: 'Customer Lifetime Value',
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
        series: [{
            name: 'CLV',
            data: data.map(d => ({
                y: d.clv,
                totalRevenue: d.totalRevenue,
                customerCount: d.customerCount
            })),
            color: '#ACE1AF',
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}', // Display with 1 decimal point
                style: {
                    color: '#333333',
                    textOutline: 'none'
                }
            }
        }],
        tooltip: {
            formatter: function() {
                const point = this.point;
                return `
                    <strong>Cohort:</strong> ${point.category}<br/>
                    <strong>Total Revenue:</strong> ${Highcharts.numberFormat(point.totalRevenue, 1)}<br/>
                    <strong>Customer Count:</strong> ${point.customerCount}<br/>
                    <strong>CLV:</strong> ${Highcharts.numberFormat(point.y, 1)}
                `;
            }
        },
        plotOptions: {
            column: {
                backgroundColor: '#ACE1AF',

                borderRadius: 5,
                dataLabels: {
                    enabled: true
                }
            }
        },
        chart: {
            type: 'column',
            zoomType: 'x',
            panning: true,
            panKey: 'shift',
            style: {
                cursor: 'crosshair'
            },

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

export default CLVColumnChart;
