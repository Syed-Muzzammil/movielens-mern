import axios from 'axios';

export default axios.create({
  baseURL: 'https://movielens-backend.onrender.com/api',
});
