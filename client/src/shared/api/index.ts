import axios from 'axios';

// Создание экземпляра Axios'a
const httpClient = axios.create({
  baseURL: 'http://localhost:3000',
});

export default httpClient;
