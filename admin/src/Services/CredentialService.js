import axios from 'axios';
import LocalStorageKey from '../Constrants/LocalStorageKey';

class CredentialService {
  BASE_URL = 'http://acme.com/auth';

  ACCESS_CONTROL_HEADER = { 'Access-Control-Allow-Origin': true };

  static logOut() {
    window.localStorage.clear();
    return 1;
  }

  async login(email, password, onSuccess, onError) {
    try {
      const response = await axios.post(`${this.BASE_URL}/login`, {
        headers: this.ACCESS_CONTROL_HEADER,
        email,
        password,
      });
      onSuccess(response);
    } catch (error) {
      onError(error);
    }
  }

  async register(email, firstName, lastName, password, onSuccess, onError) {
    try {
      const response = await axios.post(`${this.BASE_URL}/register`, {
        headers: this.ACCESS_CONTROL_HEADER,
        firstName,
        lastName,
        email,
        password,
      });
      onSuccess(response);
    } catch (error) {
      onError(error);
    }
  }

  async update(id, onSuccess, onError) {
    try {
      const response = await axios.patch(`${this.BASE_URL}/User/${id}`, {
        headers: this.ACCESS_CONTROL_HEADER,
      });
      onSuccess(response);
    } catch (error) {
      onError(error);
    }
  }
}

export default new CredentialService();
