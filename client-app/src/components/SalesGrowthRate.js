import React, { useState, useEffect, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Exporting from 'highcharts/modules/exporting';
import axios from 'axios';

// Initialize modules
HighchartsMore(Highcharts);
HighchartsAccessibility(Highcharts);
Exporting(Highcharts);

const SalesGrowthRate = () => {
    const [range, setRange] = useState('monthly');
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [range]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders/growth/${range}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

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

    const options = {
        chart: {
            zoomType: 'xy',
            panning: true,
            panKey: 'shift',
        },
        title: {
            text: 'Sales Growth Rate Over Time',
        },
        exporting: {
            enabled: true,
            buttons: {
                contextButton: {
                    menuItems: ['viewFullscreen', 'printChart'],
                },
            },
        },
        xAxis: {
            categories: data.map(item => formatDate(item._id, range)),
            title: {
                text: 'Time',
            },
            minRange: 1,
        },
        yAxis: [{
            title: {
                text: 'Total Sales',
            },
            labels: {
                format: '{value:.1f}',
            },
        }, {
            title: {
                text: 'Growth Rate (%)',
            },
            labels: {
                format: '{value:.1f}%',
            },
            opposite: true,
        }],
        tooltip: {
            shared: true,
            formatter: function () {
                let tooltip = `<strong>Date:</strong> ${this.x}<br/>`;
        
                this.points.forEach(point => {
                    const value = Highcharts.numberFormat(point.y, 1);
                    const suffix = point.series.name === 'Growth Rate' ? '%' : ' units';
                    tooltip += `<strong>${point.series.name}:</strong> ${value}${suffix}<br/>`;
                });
        
                return tooltip;
            },
        },
        
        series: [{
            name: 'Total Sales',
            type: 'column',
            yAxis: 0,
            data: data.map(item => parseFloat(item.totalSales.toFixed(1))),
            color: '#A8D5BA',
            borderRadius: 5,
        }, {
            name: 'Growth Rate',
            type: 'line',
            yAxis: 1,
            data: data.map(item => parseFloat(item.growthRate.toFixed(1))),
            color: '#FFB3BA',
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white',
            },
        }],
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return Highcharts.numberFormat(this.y, 1);
                    },
                },
                enableMouseTracking: true,
            },
        },
        chart: {
            zoomType: 'x',
            panning: true,
            panKey: 'shift',
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
            <HighchartsReact highcharts={Highcharts} options={options} />
        </Box>
    );
};

export default SalesGrowthRate;
