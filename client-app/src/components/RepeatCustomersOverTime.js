import React, { useState, useEffect, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import Exporting from 'highcharts/modules/exporting';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// Initialize Highcharts modules
HighchartsMore(Highcharts);
HighchartsAccessibility(Highcharts);
Exporting(Highcharts);

const formatDate = (date, range) => {
    const d = new Date(date);
    switch (range) {
        case 'daily':
            return d.toLocaleDateString();
        case 'monthly':
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        case 'quarterly':
            const quarter = Math.ceil((d.getMonth() + 1) / 3);
            return `${d.getFullYear()}-Q${quarter}`;
        case 'yearly':
            return `${d.getFullYear()}`;
        default:
            return d.toLocaleDateString();
    }
};

const RepeatCustomersOverTime = () => {
    const [range, setRange] = useState('monthly');
    const [repeatCustomerData, setRepeatCustomerData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/repeat/${range}`);
                const data = await response.json();
                setRepeatCustomerData(data);
            } catch (error) {
                console.error('Error fetching repeat customer data:', error);
            }
        };

        fetchData();
    }, [range]);

    const seriesData = useMemo(() => {
        return repeatCustomerData.map(item => ({
            name: formatDate(item._id, range),
            y: item.repeatCustomers
        }));
    }, [repeatCustomerData, range]);

    const chartOptions = {
        title: {
            text: 'Number of Repeat Customers Over Time',
        },
        exporting: {
            enabled: true,
            buttons: {
                contextButton: {
                    menuItems: ['viewFullscreen', 'printChart']
                }
            }
        },
        xAxis: {
            categories: repeatCustomerData.map(item => formatDate(item._id, range)),
            title: {
                text: 'Time Period',
            },
            labels: {
                rotation: -45
            }
        },
        yAxis: {
            title: {
                text: 'Number of Repeat Customers',
            },
            min: 0,
        },
        series: [
            {
                name: 'Repeat Customers',
                data: seriesData,
                color: '#CD8D7A',
                type: 'line',
            }
        ],
        tooltip: {
            shared: true,
            formatter: function () {
                return `<strong>Date:</strong> ${this.x}<br/><strong>Repeat Customers:</strong> ${Highcharts.numberFormat(this.y, 0)}`;
            },
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return Highcharts.numberFormat(this.y, 0);
                    },
                },
                enableMouseTracking: true,
            },
        },
        chart: {
            zoomType: 'x',
            panning: true,
            panKey: 'shift',
            type: 'line',
            style: {
                cursor: 'crosshair',
            },
        },
        credits: {
            enabled: false,
        },
    };

    return (
        <Box sx={{ padding: '1rem', backgroundColor: 'white', borderRadius: 3, boxShadow: 4 }}>
            <Box sx={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                <FormControl sx={{ marginRight: '1rem', minWidth: 120 }}>
                    <InputLabel>Time Range</InputLabel>
                    <Select
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                        label="Time Range"
                    >
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="quarterly">Quarterly</MenuItem>
                        <MenuItem value="yearly">Yearly</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Box>
    );
};

export default RepeatCustomersOverTime;
