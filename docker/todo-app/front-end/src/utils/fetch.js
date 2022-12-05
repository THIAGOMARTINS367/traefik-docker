import axios from 'axios';

const HOST = process.env.REACT_APP_API_HOST || "localhost";
const PORT = process.env.REACT_APP_API_PORT || 3001;

const fetch = axios.create({
  baseURL: `http://${HOST}:${PORT}`,
  timeout: 1000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

const taskApi = async (method, endpoint, body, headers) => {
  const response = await fetch.request({ method, url: endpoint, data: body, headers })
    .then(({ status, data }) => ({ status, data }));
  return response;
}

export default taskApi
