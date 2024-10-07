import axios from "axios";

const instance = axios.create({
  // Put in URL of API (cloud function)
  baseURL: 'http://localhost:5001/clone-554ae/us-central1/api'
});

export default instance;
