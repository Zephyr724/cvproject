import apiClient from "./api-client";
import create from "./http-service";

const profileApiService = Object.assign(create("/profiles"), {
  updateCurrent<T>(entity: T) {
    return apiClient.patch<T>("/profiles", entity);
  },
});

export default profileApiService;
