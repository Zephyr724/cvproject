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

  getById<T>(id: number) {
    const controller = new AbortController();

    const request = apiClient.get<T>(this.endpoint + "/" + id, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  create<T>(entity: T) {
    return apiClient.post<T>(this.endpoint, entity);
  }

  update<T>(id: number, entity: T) {
    return apiClient.patch<T>(this.endpoint + "/" + id, entity);
  }

  delete<T>(id: number) {
    return apiClient.delete<T>(this.endpoint + "/" + id);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
