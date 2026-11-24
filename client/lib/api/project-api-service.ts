import create from "./http-service";

const projectApiService = create("/projects");

export const outsideWallPosterApiService = create(
  "/projects/outside-wall-posters",
);

export default projectApiService;
