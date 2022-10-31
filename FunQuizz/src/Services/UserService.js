import axios from 'axios';
import LocalStorageKey from '~/Constants/LocalStorageKey';

class UserService {
    BASE_URL = 'http://acme.com/api/User';

    async get(token, email, onSuccess, onError) {
        try {
            const response = await axios.get(`${this.BASE_URL + '/email/' + email}`, {
                headers: {
                    'Authorization': `bearer ${token}`,
                    'Access-Control-Allow-Origin': true,
                },
            });

            console.log(`Get user successfully with email: '${email}'`);
            onSuccess(response);
        } catch (error) {
            onError(error);
        }
    }
}

export default new UserService();
