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

const NewCustomerOverTime = () => {
  const [interval, setInterval] = useState('monthly');
  const [customerData, setCustomerData] = useState([]);

  // Fetch new customer data from API based on interval
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/customers/new/${interval}`);
        setCustomerData(response.data);
      } catch (error) {
        console.error('Error fetching new customer data:', error);
      }
    };

    fetchData();
  }, [interval]);

  // Helper function to format date based on interval
  const formatDate = (date, interval) => {
    const d = new Date(date);
    switch (interval) {
      case 'daily':
        return d.toLocaleDateString();
      case 'monthly':
        return `${d.getFullYear()}-${d.getMonth() + 1}`;
      case 'quarterly':
        const quarter = Math.ceil((d.getMonth() + 1) / 3);
        return `${d.getFullYear()}-Q${quarter}`;
      case 'yearly':
        return `${d.getFullYear()}`;
      default:
        return d.toLocaleDateString();
    }
  };

  // Process data based on selected interval
  const processedData = useMemo(() => {
    const groupedData = customerData.reduce((acc, item) => {
      const dateKey = formatDate(item._id, interval);
      if (!acc[dateKey]) {
        acc[dateKey] = { name: dateKey, newCustomers: 0 };
      }
      acc[dateKey].newCustomers += item.newCustomers;
      return acc;
    }, {});

    return Object.values(groupedData).map(({ name, newCustomers }) => ({
      name,
      newCustomers
    }));
  }, [customerData, interval]);

  // Sort processed data by date
  const sortedData = useMemo(() => {
    return processedData.sort((a, b) => new Date(a.name) - new Date(b.name));
  }, [processedData]);

  // Prepare series data
  const seriesData = sortedData.map(item => item.newCustomers);

  const chartOptions = {
    title: {
      text: 'New Customers Over Time',
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
      categories: sortedData.map(item => item.name),
      title: {
        text: 'Time',
      },
      minRange: 1,
    },
    yAxis: {
      title: {
        text: 'New Customers',
      },
      min: 0,
    },
    series: [
      {
        name: 'New Customers',
        data: seriesData,
        color: '#987D9A',
      }
    ],
    tooltip: {
      shared: true,
      formatter: function () {
        return `<strong>Date:</strong> ${this.x}<br/><strong>New Customers:</strong> ${Highcharts.numberFormat(this.y, 1)}`;
      },
    },
    plotOptions: {
      line: {
        dataLabels: {
          formatter: function() {
            return Highcharts.numberFormat(this.y, 1); // Format data labels to 1 decimal place
          },
          enabled: true,
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
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
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

export default NewCustomerOverTime;
