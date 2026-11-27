/** Change one switch at a time, then refresh /3DModel and test rotation. */
export const MODEL_PERF = {
  // Hide the GLB's curved backdrop at runtime so the panorama stays visible.
  hidePlane005: true,
  // Replace physical glass transmission with cheap alpha transparency.
  disableTransmission: false,
  // Preserve exported sides: the delivery cavity and thin surfaces need back faces.
  // Forcing FrontSide globally makes those surfaces disappear from some views.
  forceFrontSide: false,
  // Hide point lights embedded in the GLB (the JSX lights remain available).
  disableImportedPointLights: false,
  // Lower values reduce the number of pixels shaded every frame. Test 1 vs 1.25.
  pixelRatio: 1.25,
  // Area.007 is a large softbox; disabling it removes one light contribution.
  disableArea007: true,
} as const;
