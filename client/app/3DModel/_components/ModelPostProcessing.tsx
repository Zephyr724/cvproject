import {
  Bloom,
  EffectComposer,
  N8AO,
  ToneMapping,
} from "@react-three/postprocessing";

export function ModelPostProcessing() {
  return (
    // EffectComposer renders the scene through the effects below in sequence.
    // Multisampling smooths jagged edges in the composed result.
    <EffectComposer multisampling={4}>
      {/*
        N8AO darkens corners and nearby surfaces to make their depth easier to read.
        The small radius and moderate intensity keep the result subtle.
      */}
      <N8AO aoRadius={0.12} intensity={0.65} distanceFalloff={1} />
      {/*
        Bloom creates a soft glow only above luminanceThreshold. mipmapBlur makes
        that glow smoother, while the low intensity avoids washing out the model.
      */}
      <Bloom
        mipmapBlur
        luminanceThreshold={1.1}
        luminanceSmoothing={0.08}
        intensity={0.12}
        radius={0.5}
      />
      {/* Tone mapping converts the final HDR colors into the monitor's display range. */}
      <ToneMapping />
    </EffectComposer>
  );
}
