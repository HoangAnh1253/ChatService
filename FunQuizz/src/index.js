import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Activity from './pages/Activity';
import MainAppBar from './components/assets/AppBar';
import { PageIndexProvider } from './Context/PageIndexContext';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
const root = ReactDOM.createRoot(document.getElementById('root'));

const font = "'Quicksand', sans-serif";
const theme = createTheme({
    typography: {
        fontFamily: font,
        fontSize: 16,
        subtitle1: {
            fontWeight: 700,
        },
    },
});

root.render(
    <GlobalStyles>
        <PageIndexProvider>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </PageIndexProvider>
    </GlobalStyles>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
