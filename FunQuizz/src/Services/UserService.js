import axios from 'axios';
import LocalStorageKey from '~/Constants/LocalStorageKey';

class UserService {
    BASE_URL = 'http://acme.com/api/User';

    async fetch(email, token, onSuccess, onError) {
        try {
            const response = await axios.get(`${this.BASE_URL + '/email/' + email}`, {
                headers: {
                    'Authorization': `bearer ${token}`,
                    'Access-Control-Allow-Origin': true,
                },
            });
            onSuccess(response);
        } catch (error) {
            onError(error);
        }
    }
}

export default new UserService();
