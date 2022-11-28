import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import UserContext from '../../../Context/UserContext';
import CredentialService from '../../../Services/CredentialService';
import LocalStorageKey from '../../../Constrants/LocalStorageKey';
import UserService from '../../../Services/UserService';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser } = React.useContext(UserContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState({});
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleClick = (_) => {
    CredentialService.login(
      email,
      password,
      (response) => {
        localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, response.data.accessToken);
        localStorage.setItem(LocalStorageKey.CURRENT_USER_EMAIL, response.data.email);
        fetchUser(response.data.email);
      },
      (error) => {
        setError(error.response.data);
      }
    );
  };

  const fetchUser = (email) => {
    UserService.get(
      email,
      (response) => {
        const data = response.data.data;
        localStorage.setItem(LocalStorageKey.CURRENT_USER_ID, data.id);
        setUser({ ...data });
        setError({});
        navigate('/dashboard/app')
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          onChange={handleEmailChange}
          error={'email' in error}
          helperText={'email' in error ? error.email : ''}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={handlePasswordChange}
          error={'password' in error}
          helperText={'password' in error ? error.password : ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
