/** Change one switch at a time, then refresh /3DModel and test rotation. */
export const MODEL_PERF = {
  // Hide the large Blender backdrop; it covers most pixels in the viewport.
  hidePlane005: false,
  // Replace physical glass transmission with cheap alpha transparency.
  disableTransmission: false,
  // Render closed meshes front-sided only to avoid drawing hidden back faces.
  forceFrontSide: true,
  // Hide point lights embedded in the GLB (the JSX lights remain available).
  disableImportedPointLights: false,
  // Lower values reduce the number of pixels shaded every frame. Test 1 vs 1.25.
  pixelRatio: 1.25,
  // Area.007 is a large softbox; disabling it removes one light contribution.
  disableArea007: true,
} as const;
