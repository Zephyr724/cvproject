import apiClient from "./api-client";

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();

    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  create<T>(entity: T) {
    return apiClient.post<T>(this.endpoint, entity);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
