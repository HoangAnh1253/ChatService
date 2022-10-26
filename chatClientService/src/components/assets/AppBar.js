import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from '~/pages/Home';
import Activity from '~/pages/Activity';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import SignUpModal from './SignUpModal';

let searchButton = (
    <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: 'blue' }} />
    </IconButton>
);

function MainAppBar(props) {
    const { activePageIndex, onChangeTabbarIndex } = props;
    const [openSignUpModal, setOpenSignUpModal] = React.useState(false);
    const handleOpenSignUpModal = () => setOpenSignUpModal(true);
    const handleCloseSignUpModal = () => setOpenSignUpModal(false);

    return (
        <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
            <AppBar position="sticky" sx={{ backgroundColor: '#FFFFFF', pt: 2 }}>
                <Toolbar variant="dense">
                    <Typography variant="h6" color="#000000" fontSize={25} component="span" sx={{ mr: 2 }}>
                        Quizziz
                    </Typography>

                    <TextField
                        id="search-bar"
                        className="text"
                        variant="outlined"
                        placeholder="Search..."
                        size="small"
                        sx={{ mr: 3 }}
                        InputProps={{ endAdornment: searchButton }}
                    />
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Tabs value={activePageIndex} onChange={onChangeTabbarIndex}>
                            <Tab label="Home" value={0} />
                            <Tab label="Activity" value={1} />
                            <Tab label="Classes" value={2} />
                        </Tabs>

                        <Box>
                            <Button variant="outlined" size="medium" sx={{ marginX: 1 }} disableElevation>
                                Sign in
                            </Button>
                            <Button variant="contained" size="medium" onClick={handleOpenSignUpModal} disableElevation>
                                Sign up
                            </Button>
                        </Box>
                    </Grid>
                </Toolbar>
            </AppBar>

            <SignUpModal openSignUpModal={openSignUpModal} handleCloseSignUpModal={handleCloseSignUpModal} />
        </Box>
    );
}

export default MainAppBar;
