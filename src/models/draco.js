import { useGLTF } from "@react-three/drei";

// Self-host the Draco decoder instead of fetching it from gstatic.com at runtime.
// Must be imported before any model module, which may preload its GLB on import.
useGLTF.setDecoderPath("/draco/");
