import axios from 'axios';

class QuestionService {
    BASE_URL = 'http://acme.com/api/examservice/Question';
    ACCESS_CONTROL_HEADER = { 'Access-Control-Allow-Origin': true };

    async create(examId, payload, onSuccess, onError) {
        try {
            const response = await axios.post(this.BASE_URL + "/exam/" + examId, 
            payload,
            {
                headers: this.ACCESS_CONTROL_HEADER,
            });
            onSuccess(response);
        } catch (error) {
            onError(error);
        }
    }
}

export default new QuestionService();
