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
import SignInModal from './SignInModal';

let searchButton = (
    <IconButton type="submit" aria-label="search">
        <SearchIcon color="primary"/>
    </IconButton>
);

function MainAppBar(props) {
    const { activePageIndex, onChangeTabbarIndex } = props;
    const [openSignUpModal, setOpenSignUpModal] = React.useState(false);
    const [openSignInModal, setOpenSignInModal] = React.useState(false);
    const handleOpenSignUpModal = () => setOpenSignUpModal(true);
    const handleCloseSignUpModal = () => setOpenSignUpModal(false);
    const handleOpenSignInModal = () => setOpenSignInModal(true);
    const handleCloseSignInModal = () => setOpenSignInModal(false);

    return (
        <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
            <AppBar position="sticky" sx={{ backgroundColor: '#FFFFFF', pt: 2 }}>
                <Toolbar variant="dense">
                    <img src={process.env.PUBLIC_URL + '/FunQuizz_logo.png'} width="150px" style={{marginRight: 25}}/>

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
                            <Tab label="Home"     value={0} />
                            <Tab label="Activity" value={1} />
                            <Tab label="Classes"  value={2} />
                        </Tabs>

                        <Box>
                            <Button
                                variant="outlined"
                                size="medium"
                                onClick={handleOpenSignInModal}
                                sx={{ marginX: 1 }}
                                disableElevation
                            >
                                Sign in
                            </Button>
                            <Button variant="contained" size="medium" onClick={handleOpenSignUpModal} disableElevation>
                                Sign up
                            </Button>
                        </Box>
                    </Grid>
                </Toolbar>
            </AppBar>

            <SignUpModal
                openSignUpModal={openSignUpModal}
                handleOpenSignInModal={handleOpenSignInModal}
                handleCloseSignUpModal={handleCloseSignUpModal} 
            />
            <SignInModal
                openSignInModal={openSignInModal}
                handleCloseSignInModal={handleCloseSignInModal} 
                handleOpenSignUpModal={handleOpenSignUpModal}
            />
        </Box>
    );
}

export default MainAppBar;
