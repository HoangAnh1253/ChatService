import axios from 'axios';

class ExamService {
  BASE_URL = 'http://acme.com/api/examservice/Exam';

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

  async create(name, authorEmail, topicID, onSuccess, onError) {
    try {
      const response = await axios.post(`${this.BASE_URL}/topic/${topicID}`, {
        headers: this.ACCESS_CONTROL_HEADER,
        name,
        authorEmail,
        timeLimit: 0,
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

  async patch(name, authorEmail, topicID, onSuccess, onError) {
    try {
      const response = await axios.patch(`${this.BASE_URL}/${topicID}`, {
        headers: this.ACCESS_CONTROL_HEADER,
        name,
        authorEmail,
        timeLimit: 0,
      });
      onSuccess(response);
    } catch (error) {
      onError(error);
    }
  }
}

export default new ExamService();
