import React from 'react';
// routes
import { useNavigate } from 'react-router-dom';
import Router from './routes';
// theme
import ThemeProvider from './theme';

// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import UserContext, { UserContextProvider } from './Context/UserContext';
import LocalStorageKey from './Constrants/LocalStorageKey';
import UserService from './Services/UserService';
// ----------------------------------------------------------------------

export default function App() {
  const { setUser } = React.useContext(UserContext);
  const navigate = useNavigate();
  React.useEffect(() => {
      const accessToken = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);

      if (accessToken !== null) {
          const userEmail = localStorage.getItem(LocalStorageKey.CURRENT_USER_EMAIL);
          UserService.get(userEmail, (response) => {
              setUser(response.data.data);
          });
        }
      else navigate('/login');
  }, []);
  
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Router />
    </ThemeProvider>
  );
}
