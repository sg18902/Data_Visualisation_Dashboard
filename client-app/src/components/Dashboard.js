import React, { useState } from 'react';
import { Box, Paper, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { Home, BarChart, TrendingUp, PersonAdd, People, Map, Menu, Close } from '@mui/icons-material';
import { Link as ScrollLink, Element } from 'react-scroll';
import SearchBar from './SearchBar';
import TotalSalesOverTime from './totalSalesOverTime';
import TotalSalesOverTimeBarChart from './TotalSalesOverTimeColumnChart';
import SalesGrowthRate from './SalesGrowthRate';
import NewCustomerOverTime from './NewCustomerOverTime';
import RepeatCustomersOverTime from './RepeatCustomersOverTime';
import CLVColumnChart from './CLVColumnChart';
import CLVlinechart from './CLVlinechart';
import CustomerMap from './CustomerMap';

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: '#F6F5F2',
                minHeight: '100vh',
                padding: 2,
            }}
        >
            {/* Sidebar */}
            <Box
                sx={{
                    width: sidebarOpen ? '180px' : '40px',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100%',
                    backgroundColor: '#000000',
                    color: '#FFF',
                    padding: '10px',
                    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)',
                    zIndex: 1000,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: '10px',
                    }}
                >
                    <IconButton
                        onClick={toggleSidebar}
                        sx={{ color: '#FFF' }}
                    >
                        {sidebarOpen ? <Close /> : <Menu />}
                    </IconButton>
                    {sidebarOpen && <h3 style={{ margin: 0, marginRight: '30px' }}>RuinInsight</h3>}
                </Box>
                <Divider sx={{ backgroundColor: '#FFF' }} />
                <List>
                    <ListItem button sx={{ padding: sidebarOpen ? '10px' : '8px', height: '80px' }}>
                        <ScrollLink
                            to="totalSalesOverTime"
                            smooth={true}
                            duration={500}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', color: '#FFF' }}
                        >
                            <Home sx={{ marginRight: sidebarOpen ? '10px' : '0px' }} />
                            {sidebarOpen && <ListItemText primary="Total Sales Over Time" />}
                        </ScrollLink>
                    </ListItem>
                    <ListItem button sx={{ padding: sidebarOpen ? '10px' : '8px', height: '80px' }}>
                        <ScrollLink
                            to="totalSalesBarChart"
                            smooth={true}
                            duration={500}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', color: '#FFF' }}
                        >
                            <BarChart sx={{ marginRight: sidebarOpen ? '10px' : '0px' }} />
                            {sidebarOpen && <ListItemText primary="Total Sales Bar Chart" />}
                        </ScrollLink>
                    </ListItem>
                    <ListItem button sx={{ padding: sidebarOpen ? '10px' : '8px' , height: '80px'}}>
                        <ScrollLink
                            to="salesGrowthRate"
                            smooth={true}
                            duration={500}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', color: '#FFF' }}
                        >
                            <TrendingUp sx={{ marginRight: sidebarOpen ? '10px' : '0px' }} />
                            {sidebarOpen && <ListItemText primary="Sales Growth Rate" />}
                        </ScrollLink>
                    </ListItem>
                    <ListItem button sx={{ padding: sidebarOpen ? '10px' : '8px', height: '80px' }}>
                        <ScrollLink
                            to="newCustomerOverTime"
                            smooth={true}
                            duration={500}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', color: '#FFF' }}
                        >
                            <PersonAdd sx={{ marginRight: sidebarOpen ? '10px' : '0px' }} />
                            {sidebarOpen && <ListItemText primary="New Customer Over Time" />}
                        </ScrollLink>
                    </ListItem>
                    <ListItem button sx={{ padding: sidebarOpen ? '10px' : '8px', height: '80px' }}>
                        <ScrollLink
                            to="repeatCustomersOverTime"
                            smooth={true}
                            duration={500}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', color: '#FFF' }}
                        >
                            <People sx={{ marginRight: sidebarOpen ? '10px' : '0px' }} />
                            {sidebarOpen && <ListItemText primary="Repeated Customers Over Time" />}
                        </ScrollLink>
                    </ListItem>
                    <ListItem button sx={{ padding: sidebarOpen ? '10px' : '8px', height: '80px' }}>
                        <ScrollLink
                            to="clvColumnChart"
                            smooth={true}
                            duration={500}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', color: '#FFF' }}
                        >
                            <BarChart sx={{ marginRight: sidebarOpen ? '10px' : '0px' }} />
                            {sidebarOpen && <ListItemText primary="CLV Column Chart" />}
                        </ScrollLink>
                    </ListItem>
                    <ListItem button sx={{ padding: sidebarOpen ? '10px' : '8px', height: '80px' }}>
                        <ScrollLink
                            to="clvLineChart"
                            smooth={true}
                            duration={500}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', color: '#FFF' }}
                        >
                            <TrendingUp sx={{ marginRight: sidebarOpen ? '10px' : '0px' }} />
                            {sidebarOpen && <ListItemText primary="CLV Line Chart" />}
                        </ScrollLink>
                    </ListItem>
                    <ListItem button sx={{ padding: sidebarOpen ? '10px' : '8px', height: '80px' }}>
                        <ScrollLink
                            to="customerMap"
                            smooth={true}
                            duration={500}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', color: '#FFF' }}
                        >
                            <Map sx={{ marginRight: sidebarOpen ? '10px' : '0px' }} />
                            {sidebarOpen && <ListItemText primary="Customer Distributions" />}
                        </ScrollLink>
                    </ListItem>
                </List>
            </Box>

            {/* Main Content */}
            <Box
                sx={{
                    marginLeft: sidebarOpen ? '200px' : '60px',
                    padding: 2,
                    width: sidebarOpen ? 'calc(100% - 200px)' : 'calc(100% - 60px)',
                    transition: 'margin-left 0.3s, width 0.3s',
                }}
            >
                <Element name="totalSalesOverTime" className="element">
                    <Paper
                        sx={{
                            padding: 2,
                            marginBottom: '30px',
                            backgroundColor: '#F0F8FF'
                        }}
                    >
                        <SearchBar />
                    </Paper>
                    <Paper
                        sx={{
                            padding: 2,
                            marginBottom: '30px',
                            backgroundColor: '#F0F8FF'
                        }}
                    >
                        <TotalSalesOverTime />
                    </Paper>
                </Element>
                <Element name="totalSalesBarChart" className="element">
                    <Paper
                        sx={{
                            padding: 2,
                            marginBottom: '30px',
                            backgroundColor: '#F0F8FF'
                        }}
                    >
                        <TotalSalesOverTimeBarChart />
                    </Paper>
                </Element>
                <Element name="salesGrowthRate" className="element">
                    <Paper
                        sx={{
                            padding: 2,
                            marginBottom: '30px',
                            backgroundColor: '#F0F8FF'
                        }}
                    >
                        <SalesGrowthRate />
                    </Paper>
                </Element>
                <Element name="newCustomerOverTime" className="element">
                    <Paper
                        sx={{
                            padding: 2,
                            marginBottom: '30px',
                            backgroundColor: '#F0F8FF'
                        }}
                    >
                        <NewCustomerOverTime />
                    </Paper>
                </Element>
                <Element name="repeatCustomersOverTime" className="element">
                    <Paper
                        sx={{
                            padding: 2,
                            marginBottom: '30px',
                            backgroundColor: '#F0F8FF'
                        }}
                    >
                        <RepeatCustomersOverTime />
                    </Paper>
                </Element>
                <Element name="clvColumnChart" className="element">
                    <Paper
                        sx={{
                            padding: 2,
                            marginBottom: '30px',
                            backgroundColor: '#F0F8FF'
                        }}
                    >
                        <CLVColumnChart />
                    </Paper>
                </Element>
                <Element name="clvLineChart" className="element">
                    <Paper
                        sx={{
                            padding: 2,
                            marginBottom: '30px',
                            backgroundColor: '#F0F8FF'
                        }}
                    >
                        <CLVlinechart />
                    </Paper>
                </Element>
                <Element name="customerMap" className="element">
                    <Paper
                        sx={{
                            padding: 2,
                            marginBottom: '30px',
                            backgroundColor: '#F0F8FF'
                        }}
                    >
                        <CustomerMap />
                    </Paper>
                </Element>
            </Box>
        </Box>
    );
};

export default Dashboard;
