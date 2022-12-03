import axios from 'axios';

class TopicService {
  BASE_URL = 'http://acme.com/api/examservice/Topic';

  ACCESS_CONTROL_HEADER = { 'Access-Control-Allow-Origin': true };

  async get(onSuccess, onError) {
    try {
      const response = await axios.get(`${this.BASE_URL}`, {
        headers: this.ACCESS_CONTROL_HEADER,
      });
      onSuccess(response);
    } catch (error) {
      onError(error);
    }
  }

  async create(name, onSuccess, onError) {
    try {
      const response = await axios.post(`${this.BASE_URL}`, {
        headers: this.ACCESS_CONTROL_HEADER,
        name,
      });
      onSuccess(response);
    } catch (error) {
      onError(error);
    }
  }

  async delete(id, onSuccess, onError) {
    try {
      const response = await axios.delete(`${this.BASE_URL}/${id}`, {
        headers: this.ACCESS_CONTROL_HEADER,
      });
      onSuccess(response);
    } catch (error) {
      onError(error);
    }
  }

  async patch(name, topicID, onSuccess, onError) {
    try {
      const response = await axios.patch(`${this.BASE_URL}/${topicID}`, {
        headers: this.ACCESS_CONTROL_HEADER,
        name,
      });
      onSuccess(response);
    } catch (error) {
      onError(error);
    }
  }
}

export default new TopicService();
