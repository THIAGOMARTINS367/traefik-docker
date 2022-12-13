import axios from 'axios';

const HOST = process.env.REACT_APP_API_HOST || "localhost";
const PORT = process.env.REACT_APP_API_PORT || 3001;

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const fetch = axios.create({
  baseURL: apiBaseUrl || `http://${HOST}:${PORT}`,
  timeout: 1000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export const registrationApi = async (method, endpoint, body) => fetch
  .request({ method, url: endpoint, data: body })
  .then(({ status, data }) => ({ status, data }));

export const loginApi = async (method, endpoint, body) => fetch
  .request({ method, url: endpoint, data: body })
  .then(({ status, data }) => ({ status, data }));
