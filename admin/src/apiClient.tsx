import axios, { Method } from 'axios';

const BASE_URI = 'http://localhost:5000';

const client = axios.create({
  baseURL: BASE_URI,
});

class ApiClient {
  getMappings() {
    return this.perform('GET', '/mappings');
  }

  async perform (method: Method, resource: string, data?: any) {
    return client({
      method,
      url: resource,
      data,
    }).then(resp => resp.data || [])
  }
}

export default ApiClient;
