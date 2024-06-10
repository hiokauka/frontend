import axios from 'axios';

const instance = axios.create({

  baseURL: 'http://localhost:8080',

});

instance.interceptors.request.use((config) => {

  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  if (username && password) {

    config.auth = {

      username,
      password,

    };

  }

  return config;

});

export default instance;