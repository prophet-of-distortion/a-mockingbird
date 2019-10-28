import axios, { Method } from 'axios';

const BASE_URI = 'http://localhost:5000';

const client = axios.create({
  baseURL: BASE_URI,
});

class ApiClient {
  createMapping(mapping: object) {
    return this.perform('POST', '/mapping', mapping);
  }

  deleteMapping(id: number) {
    return this.perform('DELETE', `/mapping/${id}`);
  }

  getMappings() {
    return this.perform('GET', '/mappings');
  }

  updateMapping(id: number, mapping: object) {
    return this.perform('PUT', `/mapping/${id}`, mapping);
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
