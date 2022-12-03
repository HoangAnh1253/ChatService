import { TokenRounded } from '@mui/icons-material';
import axios from 'axios';
import LocalStorageKey from '../Constrants/LocalStorageKey';
import LocalStorageService from './LocalStorageService';

class UserService {
  BASE_URL = 'http://acme.com/api/User';

  ACCESS_CONTROL_HEADER = { 'Access-Control-Allow-Origin': true };

  async get(email, onSuccess, onError) {
    try {
      const { token } = LocalStorageService.get();
      const response = await axios.get(`${this.BASE_URL}/email/${email}`, {
        headers: {
          Authorization: `bearer ${token}`,
          'Access-Control-Allow-Origin': true,
        },
      });

      console.log(`Get user successfully with email: '${email}'`);
      onSuccess(response);
    } catch (error) {
      onError(error);
    }
  }

  async getAll(onSuccess, onError) {
    try {
      const { token } = LocalStorageService.get();
      const response = await axios.get(`${this.BASE_URL}`, {
        headers: {
          Authorization: `bearer ${token}`,
          'Access-Control-Allow-Origin': true,
        },
      });

      console.log(`Get alluser successfully`);
      onSuccess(response);
    } catch (error) {
      onError(error);
    }
  }

  async update(userID, email, firstName, lastName, onSuccess, onError) {
    try {
      const { token, id } = LocalStorageService.get();
      const response = await axios.patch(
        `${this.BASE_URL}/${userID}`,
        { firstName, email, lastName },
        {
          headers: {
            Authorization: `bearer ${token}`,
            'Access-Control-Allow-Origin': true,
          },
        }
      );

      console.log(`Get user successfully : `);
      onSuccess(response);
    } catch (error) {
      onError(error);
    }
  }

  async delete(userID, onSuccess, onError) {
    try {
      const { token, id } = LocalStorageService.get();
      const response = await axios.delete(`${this.BASE_URL}/${userID}`, {
        headers: {
          Authorization: `bearer ${token}`,
          'Access-Control-Allow-Origin': true,
        },
      });

      console.log(`Get user successfully : `);
      onSuccess(response);
    } catch (error) {
      onError(error);
    }
  }
}

export default new UserService();
