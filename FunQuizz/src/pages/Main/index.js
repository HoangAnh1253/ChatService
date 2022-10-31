import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainAppBar from '~/components/assets/AppBar';
import Activity from '../Activity';
import { Typography } from '@mui/material';
import Home from '../Home';
import PageIndexContext from '~/Context/PageIndexContext';
import UserContext from '~/Context/UserContext';
import LocalStorageKey from '~/Constants/LocalStorageKey';
import UserService from '~/Services/UserService';

const Main = () => {
    const pageIndex = useContext(PageIndexContext);
    const {user, setUser} = useContext(UserContext)

    useEffect(() => {
        const accessToken = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);
        
        if (accessToken !== null) {
            const userEmail = localStorage.getItem(LocalStorageKey.CURRENT_USER_EMAIL);
            UserService.get(accessToken, userEmail, (response) => {
                setUser(response.data.data);
            });
        }
    }, []);

    return (
        <React.Fragment>
            {pageIndex.activePageIndex === 0 && <Home />}
            {pageIndex.activePageIndex === 1 && <Activity />}
            {pageIndex.activePageIndex === 2 && <Classes />}
        </React.Fragment>
    );
};

const Classes = () => {
    return (
        <Typography variant="h6" color="#000000" component="div" sx={{ mr: 2 }}>
            Classes page
        </Typography>
    );
};

export default Main;
