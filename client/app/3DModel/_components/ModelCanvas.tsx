"use client";

// This component uses React hooks and WebGL APIs, so it must run in the browser.
import { Suspense, useEffect, useRef, useState, type ElementRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useHelper } from "@react-three/drei";
import { MainModel } from "./MainModel";
import * as THREE from "three";

// Infer the exact ref type exposed by Drei's OrbitControls component.
// The ref lets us call imperative methods such as update(), saveState(), and reset().
type OrbitControlsRef = ElementRef<typeof OrbitControls>;

/**
 * ModelScene must be rendered inside <Canvas> because it uses useThree().
 * Everything returned by this component becomes an object in the Three.js scene.
 *
 * resetRequest is a counter owned by ModelCanvas. Every increment tells this
 * component that the user clicked the HTML "Reset Camera" button.
 */
function ModelScene({ resetRequest }: { resetRequest: number }) {
  // useThree gives components access to React Three Fiber's internal state.
  // We select `state.get` so we can read the current camera only when needed,
  // without subscribing this component to every camera movement.
  const getThreeState = useThree((state) => state.get);
  const keyLightRef = useRef<THREE.DirectionalLight>(null!);
  const fillLightRef = useRef<THREE.DirectionalLight>(null!);

  useHelper(keyLightRef, THREE.DirectionalLightHelper, 1, "red");
  useHelper(fillLightRef, THREE.DirectionalLightHelper, 1, "cyan");

  // MainModel measures the loaded GLB and sends its world-space bounding box
  // back through onBoundsReady. Until loading and measurement finish, this is null.
  const [bounds, setBounds] = useState<THREE.Box3 | null>(null);

  // Keep a persistent reference to the actual OrbitControls instance.
  // Changing a ref does not cause a React re-render.
  const controlsRef = useRef<OrbitControlsRef>(null);

  // Set the initial camera view after both the model bounds and controls exist.
  useEffect(() => {
    // The GLB and OrbitControls may become ready at different times.
    // Do nothing until both dependencies are available.
    if (!bounds || !controlsRef.current) return;

    // Get the camera that was created by <Canvas>.
    const camera = getThreeState().camera;

    // Box3.getCenter writes the bounding-box center into the supplied Vector3.
    // This becomes the point that the camera and OrbitControls look at.
    const center = bounds.getCenter(new THREE.Vector3());

    // Box3.getSize returns the model's width (X), height (Y), and depth (Z).
    const size = bounds.getSize(new THREE.Vector3());

    // Use the largest dimension as one simple scale-independent measurement.
    // A larger model therefore moves the camera farther away automatically.
    const largestSize = Math.max(size.x, size.y, size.z);

    // This multiplier controls framing, not viewing direction.
    // Increase it to show more empty space; decrease it to move closer.
    const distance = largestSize * 2;

    // Horizontal orbit angle copied from the chosen Blender view.
    // Three.js trigonometric functions require radians rather than degrees.
    const azimuth = THREE.MathUtils.degToRad(35.6);

    // Vertical angle above the model's center. A positive value places the
    // camera above the target, so it looks downward after the target is set.
    const elevation = THREE.MathUtils.degToRad(11);

    // Convert the two angles into a unit direction vector.
    // X controls the left/right offset, Y controls height, and Z controls the
    // front/back offset. cos(elevation) keeps the horizontal part proportional
    // while sin(elevation) supplies the vertical part.
    const direction = new THREE.Vector3(
      Math.sin(azimuth) * Math.cos(elevation),
      Math.sin(elevation),
      Math.cos(azimuth) * Math.cos(elevation),
    );

    // Final position formula:
    // camera position = model center + direction * distance
    // copy() prevents us from modifying `center` itself.
    camera.position.copy(center).addScaledVector(direction, distance);

    // OrbitControls rotates around `target`, so use the measured model center
    // instead of the world origin. This keeps interaction centered on the model.
    controlsRef.current.target.copy(center);

    // Apply the new camera position and target immediately.
    controlsRef.current.update();

    // OrbitControls.reset() returns to the last state saved here.
    // It is important to save only after the automatic camera setup is complete.
    controlsRef.current.saveState();
  }, [bounds, getThreeState]);

  // Respond to Reset button clicks from the parent component.
  useEffect(() => {
    // Zero means no click has happened yet. The ref may also be unavailable
    // briefly while the scene is mounting.
    if (resetRequest === 0 || !controlsRef.current) return;

    // Restore the camera position, zoom, and target recorded by saveState().
    controlsRef.current.reset();
  }, [resetRequest]);

  return (
    <>
      {/* Debug axes: X is red, Y is green, and Z is blue. */}
      <axesHelper args={[5]} />

      {/* Debug grid: a visual reference for the XZ ground plane at Y = 0. */}
      <gridHelper args={[10, 10]} />

      {/* Ambient light illuminates every surface equally and softens dark areas. */}
      <ambientLight intensity={1} />

      {/* Directional light acts like a distant light with parallel rays. */}
      <directionalLight
        ref={keyLightRef}
        position={[-3, 1.5, 3]}
        intensity={6}
        color="#fff1e6"
      />

      <directionalLight
        ref={fillLightRef}
        position={[7.1, 0.86, -0.09]}
        intensity={4}
        color="#dbeafe"
      />

      {/*
        Suspense temporarily renders the fallback while useGLTF loads the GLB.
        After MainModel measures the model, setBounds stores its Box3 here and
        triggers the camera-setup effect above.
      */}
      <Suspense fallback={null}>
        <MainModel onBoundsReady={setBounds} />
      </Suspense>

      {/*
        OrbitControls enables mouse rotation, zooming, and panning.
        The ref connects these controls to the setup and reset effects above.
      */}
      <OrbitControls
        ref={controlsRef}
        onEnd={() => {
          // Log only after an interaction ends, which is less noisy than
          // logging on every animation frame while the camera is moving.
          console.log(
            "Camera position:",
            getThreeState().camera.position.toArray(),
          );
        }}
      />
    </>
  );
}

export function ModelCanvas() {
  // This number is used as an event signal between the normal HTML interface
  // and ModelScene inside <Canvas>. Every click produces a new value, so the
  // reset effect runs even when the button is clicked repeatedly.
  const [resetRequest, setResetRequest] = useState(0);

  return (
    // `relative` makes this wrapper the positioning reference for the button.
    <div className="relative h-[calc(100dvh-4rem)] w-full overflow-hidde">
      {/*
        Canvas creates the Three.js scene, WebGL renderer, camera, and render loop.
        This camera position is only a temporary starting value: ModelScene moves
        it after the GLB's real bounds have been measured.
      */}
      <Canvas
        camera={{
          position: [0, 1, 5],
          fov: 50,
        }}
      >
        <ModelScene resetRequest={resetRequest} />
      </Canvas>

      {/* This is a normal DOM button layered above the WebGL canvas. */}
      <button
        type="button"
        onClick={() => {
          // Incrementing the counter triggers ModelScene's reset effect.
          setResetRequest((current) => current + 1);
        }}
        className="absolute bottom-4 right-4 z-10 rounded-lg bg-black/70 px-4 py-2 text-white hover:bg-black/90"
      >
        Reset Camera
      </button>
    </div>
  );
}
