import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainAppBar from '~/components/assets/AppBar';
import Activity from '../Activity';
import { Typography } from '@mui/material';
import Home from '../Home';

const Main = () => {
    const [activePageIndex, setActivePageIndex] = React.useState(0);

    const onChangeTabbarIndex = (_, val) => {
        setActivePageIndex(val);
    };

    return (
        <React.Fragment>
            <MainAppBar activePageIndex={activePageIndex} onChangeTabbarIndex={onChangeTabbarIndex}/>

            { activePageIndex === 0 && <Home /> }
            { activePageIndex === 1 && <Activity /> }
            { activePageIndex === 2 && <Classes /> }
        </React.Fragment>
    );
};

const Classes = () => {
    return (
        <Typography variant="h6" color="#000000" component="div" sx={{ mr: 2 }}>
            Classes page
        </Typography>
    );
}

export default Main;
