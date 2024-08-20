import React, { useState } from 'react';
import { Box, TextField, InputAdornment, IconButton, Avatar, Popover, Typography, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GridViewIcon from '@mui/icons-material/GridView';
import CloseIcon from '@mui/icons-material/Close';
import AnalyticsIcon from '@mui/icons-material/Assessment';
import CRMIcon from '@mui/icons-material/ContactSupport';
import CommerceIcon from '@mui/icons-material/ShoppingCart';
import LogisticsIcon from '@mui/icons-material/LocalShipping';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import RolesIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';
import DialogIcon from '@mui/icons-material/FolderOpen';
import TypographyIcon from '@mui/icons-material/TextFields';
import AccordionIcon from '@mui/icons-material/Dehaze';
import AlertIcon from '@mui/icons-material/Warning';
import CardsIcon from '@mui/icons-material/CreditCard';
import RadioIcon from '@mui/icons-material/RadioButtonChecked';
import FormLayoutsIcon from '@mui/icons-material/ViewList';
import TableIcon from '@mui/icons-material/TableChart';
import EditorIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import DvrIcon from '@mui/icons-material/Dvr';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import GroupIcon from '@mui/icons-material/Group';
import NoNotificationsIcon from '@mui/icons-material/NotificationsOff';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import InfoIcon from '@mui/icons-material/Info';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const SearchBar = () => {
    const [searchAnchorEl, setSearchAnchorEl] = useState(null);
    const [gridAnchorEl, setGridAnchorEl] = useState(null);
    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
    const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);

    const handleSearchClick = (event) => {
        setSearchAnchorEl(event.currentTarget);
    };

    const handleGridViewClick = (event) => {
        setGridAnchorEl(event.currentTarget);
    };

    const handleNotificationClick = (event) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleAvatarClick = (event) => {
        setAvatarAnchorEl(event.currentTarget);
    };

    const handleSearchClose = () => {
        setSearchAnchorEl(null);
    };

    const handleGridClose = () => {
        setGridAnchorEl(null);
    };

    const handleNotificationClose = () => {
        setNotificationAnchorEl(null);
    };

    const handleAvatarClose = () => {
        setAvatarAnchorEl(null);
    };

    const isSearchOpen = Boolean(searchAnchorEl);
    const isGridOpen = Boolean(gridAnchorEl);
    const isNotificationOpen = Boolean(notificationAnchorEl);
    const isAvatarOpen = Boolean(avatarAnchorEl);

    const searchId = isSearchOpen ? 'search-popup' : undefined;
    const gridId = isGridOpen ? 'grid-popup' : undefined;
    const notificationId = isNotificationOpen ? 'notification-popup' : undefined;
    const avatarId = isAvatarOpen ? 'avatar-popup' : undefined;

    const items = [
        { title: 'Calendar', description: 'Appointments', Icon: CalendarIcon },
        { title: 'Invoice App', description: 'Manage Accounts', Icon: ReceiptLongIcon },
        { title: 'Users', description: 'Manage Users', Icon: PersonIcon },
        { title: 'Roles', description: 'Permission', Icon: GroupIcon },
        { title: 'Dashboard', description: 'Dashboard Analytics', Icon: DvrIcon },
        { title: 'Settings', description: 'Account Settings', Icon: SettingsIcon },
    ];

    const categories = [
        {
            title: 'Popular Searches',
            items: [
                { icon: <AnalyticsIcon />, text: 'Analytics' },
                { icon: <CRMIcon />, text: 'CRM' },
                { icon: <CommerceIcon />, text: 'eCommerce' },
                { icon: <LogisticsIcon />, text: 'Logistics' },
            ],
        },
        {
            title: 'Apps & Pages',
            items: [
                { icon: <CalendarIcon />, text: 'Calendar' },
                { icon: <RolesIcon />, text: 'Roles & Permissions' },
                { icon: <SettingsIcon />, text: 'Account Settings' },
                { icon: <DialogIcon />, text: 'Dialog Examples' },
            ],
        },
        {
            title: 'User Interface',
            items: [
                { icon: <TypographyIcon />, text: 'Typography' },
                { icon: <AccordionIcon />, text: 'Accordion' },
                { icon: <AlertIcon />, text: 'Alert' },
                { icon: <CardsIcon />, text: 'Cards' },
            ],
        },
        {
            title: 'Forms & Tables',
            items: [
                { icon: <RadioIcon />, text: 'Radio' },
                { icon: <FormLayoutsIcon />, text: 'Form Layouts' },
                { icon: <TableIcon />, text: 'Table' },
                { icon: <EditorIcon />, text: 'Editor' },
            ],
        },
    ];

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#F0F8FF', padding: '8px 16px', borderRadius: 1, boxShadow: 1 }}>
            <TextField
                variant="standard"
                placeholder="Search"
                aria-describedby={searchId}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    readOnly: true,
                    disableUnderline: true,
                }}
                onClick={handleSearchClick}
                sx={{ flexGrow: 1, cursor: 'pointer' }}
            />

            <IconButton onClick={handleGridViewClick}>
                <GridViewIcon />
            </IconButton>
            <IconButton onClick={handleNotificationClick}>
                <NotificationsIcon />
            </IconButton>
            <IconButton onClick={handleAvatarClick}>
                <Avatar alt="User Avatar" src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Free-Image.png" sx={{ width: 32, height: 32 }} />
            </IconButton>

            {/* Search Popup */}
            <Popover
                id={searchId}
                open={isSearchOpen}
                anchorEl={searchAnchorEl}
                onClose={handleSearchClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: { width: 500, maxWidth: '90%', padding: '16px', borderRadius: '10px' },
                }}
            >
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid #e0e0e0' }}>
                        <TextField
                            variant="outlined"
                            placeholder="Search"
                            sx={{
                                width: '100%',
                                maxWidth: '300px', // Adjust as needed
                                backgroundColor: 'white',
                                borderRadius: '50px', // Make the TextField round
                                boxShadow: 1,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '50px', // Ensure the input itself is round
                                    '& fieldset': {
                                        border: 'none', // Remove the default border
                                    },
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <IconButton onClick={handleSearchClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Grid container spacing={2} sx={{ paddingTop: '16px' }}>
                        {categories.map((category, index) => (
                            <Grid item xs={6} key={index}>
                                <Typography variant="subtitle2" sx={{ color: '#9e9e9e', marginBottom: '8px' }}>
                                    {category.title.toUpperCase()}
                                </Typography>
                                <List dense>
                                    {category.items.map((item, idx) => (
                                        <ListItem button key={idx}>
                                            <ListItemIcon sx={{ minWidth: '36px' }}>{item.icon}</ListItemIcon>
                                            <ListItemText primary={item.text} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Popover>

            {/* Grid View Popup */}
            <Popover
                id={gridId}
                open={isGridOpen}
                anchorEl={gridAnchorEl}
                onClose={handleGridClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: { width: 400, padding: '16px', borderRadius: '10px', boxShadow: 3 },
                }}
            >
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingBottom: '8px',
                            borderBottom: '1px solid #e0e0e0',
                            marginBottom: '16px'
                        }}
                    >
                        <Typography variant="h6">Shortcuts</Typography>
                    </Box>
                    <Grid container spacing={2}>
                        {items.map(({ title, description, Icon }, index) => (
                            <Grid item xs={6} key={index}>
                                <List
                                    sx={{
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '8px',
                                        padding: '8px',
                                        margin: '8px 0',
                                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}
                                >
                                    <ListItem button sx={{ padding: 0 }}>
                                        <ListItemIcon sx={{ minWidth: 'auto', mb: 1 }}>
                                            <Icon sx={{ fontSize: 40 }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={<Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>{title}</Typography>}
                                            secondary={<Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>{description}</Typography>}
                                        />
                                    </ListItem>
                                </List>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Popover>

            {/* Notification Popup */}
            <Popover
                id={notificationId}
                open={isNotificationOpen}
                anchorEl={notificationAnchorEl}
                onClose={handleNotificationClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: { width: 300, padding: '16px', borderRadius: '10px', boxShadow: 3 },
                }}
            >
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid #e0e0e0' }}>
                        <Typography variant="h6">Notifications</Typography>
                        <IconButton onClick={handleNotificationClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ marginTop: '8px' }}>
                        {/* Add notifications here */}
                        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                            <NoNotificationsIcon sx={{ fontSize: 50, color: 'text.disabled' }} />
                            <br />
                            No notifications to display
                        </Typography>
                    </Box>
                </Box>
            </Popover>

            {/* Avatar Popover */}
            <Popover
                id={avatarId}
                open={isAvatarOpen}
                anchorEl={avatarAnchorEl}
                onClose={handleAvatarClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: { width: 250, maxWidth: '90%', padding: '16px', borderRadius: '10px' },
                }}
            >
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: '16px' }}>
                        <Avatar alt="User Avatar" src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Free-Image.png" sx={{ width: 56, height: 56, marginRight: '16px' }} />
                        <Typography variant="h6">Shivam Goswami</Typography>
                    </Box>
                    <List>
                        <ListItem button>
                            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><SettingsIcon /></ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><PaymentIcon /></ListItemIcon>
                            <ListItemText primary="Billing Plan" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><InfoIcon /></ListItemIcon>
                            <ListItemText primary="FAQ" />
                        </ListItem>
                        <ListItem
                            button
                            sx={{
                                bgcolor: '#FF8A8A', // Light red pastel color
                                '&:hover': {
                                    bgcolor: '#FF4C4C', // Slightly darker shade on hover
                                },
                                borderRadius: '8px', // Optional: to give rounded corners
                            }}
                        >
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Box>
            </Popover>
        </Box>
    );
};

export default SearchBar;
