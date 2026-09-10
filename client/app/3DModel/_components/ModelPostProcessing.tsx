import {
  Bloom,
  EffectComposer,
  N8AO,
  ToneMapping,
} from "@react-three/postprocessing";

export function ModelPostProcessing() {
  return (
    <EffectComposer multisampling={4}>
      <N8AO aoRadius={0.12} intensity={0.65} distanceFalloff={1} />
      <Bloom
        mipmapBlur
        luminanceThreshold={1.1}
        luminanceSmoothing={0.08}
        intensity={0.12}
        radius={0.5}
      />
      <ToneMapping />
    </EffectComposer>
  );
}
