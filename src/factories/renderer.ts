import {
  ACESFilmicToneMapping,
  LinearToneMapping,
  PCFSoftShadowMap,
  ReinhardToneMapping,
  sRGBEncoding,
  WebGLRenderer,
} from 'three';

export default function makeRenderer() {
  const renderer = new WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance',
  });

  renderer.shadowMap.enabled = true;
  renderer.outputEncoding = sRGBEncoding;
  // renderer.physicallyCorrectLights = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.toneMapping = LinearToneMapping;

  return renderer;
}
