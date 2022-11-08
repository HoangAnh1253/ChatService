import { Fragment, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layout';
import React from 'react';
import './App.css';
import { Container } from '@mui/material';
import LocalStorageKey from './Constants/LocalStorageKey';
import UserService from './Services/UserService';
import UserContext, { UserContextProvider } from './Context/UserContext';

function App() {
    const { setUser } = React.useContext(UserContext);

    React.useEffect(() => {
        const accessToken = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);

        if (accessToken !== null) {
            const userEmail = localStorage.getItem(LocalStorageKey.CURRENT_USER_EMAIL);
            UserService.get(userEmail, (response) => {
                setUser(response.data.data);
            });
        }
    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Container maxWidth="xl">
                                            <Page />
                                        </Container>
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
