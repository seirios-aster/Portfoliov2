import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { pointer, prefersReducedMotion, scrollState } from "../lib/scroll";

// One keyframe per section (hero, about, experience, skills, projects, contact).
// x/y are fractions of the visible width/height; s is the blob size.
const KEYS = [
  { x: 0.3, y: 0.0, s: 0.85, color: "#7c6cff", distort: 0.42 }, // hero: right of the headline
  { x: 0.4, y: 0.24, s: 0.42, color: "#22d3ee", distort: 0.34 }, // about: top-right corner
  { x: -0.3, y: -0.24, s: 0.5, color: "#a78bfa", distort: 0.5 }, // experience: under the sticky heading
  { x: 0.3, y: 0.06, s: 0.55, color: "#34d399", distort: 0.3 }, // skills: behind the glass cards
  { x: 0.32, y: 0.2, s: 0.6, color: "#f472b6", distort: 0.46 }, // projects: top-right
  { x: 0.25, y: 0.0, s: 0.8, color: "#60a5fa", distort: 0.55 }, // contact: behind the form
]

const smooth = (t) => t * t * (3 - 2 * t);
const tmpA = new THREE.Color();
const tmpB = new THREE.Color();

const sample = (mobile) => {
  const f = scrollState.section;
  const i = Math.min(KEYS.length - 1, Math.floor(f));
  const j = Math.min(KEYS.length - 1, i + 1);
  const t = smooth(f - i);
  const a = KEYS[i];
  const b = KEYS[j];
  const lerp = (k) => a[k] + (b[k] - a[k]) * t;
  tmpA.set(a.color).lerp(tmpB.set(b.color), t);
  return {
    x: lerp("x") * (mobile ? 0.3 : 1),
    y: lerp("y") + (mobile && f < 1 ? -0.16 : 0),
    s: lerp("s") * (mobile ? 0.9 : 1),
    distort: lerp("distort"),
    color: tmpA,
  };
};

const Blob = ({ reduced }) => {
  const group = useRef();
  const mesh = useRef();
  const mat = useRef();
  const { viewport } = useThree();
  const mobile = viewport.aspect < 0.8;
  const unit = Math.min(viewport.width, viewport.height) * 0.36;

  useFrame((state, dt) => {
    const k = sample(mobile);
    const g = group.current;
    const damp = THREE.MathUtils.damp;
    g.position.x = damp(g.position.x, k.x * viewport.width + pointer.x * 0.25, 3, dt);
    g.position.y = damp(g.position.y, k.y * viewport.height + pointer.y * 0.18, 3, dt);
    const s = damp(g.scale.x, k.s * unit, 3, dt);
    g.scale.setScalar(s);
    g.rotation.y = damp(g.rotation.y, pointer.x * 0.6 + scrollState.progress * Math.PI * 2, 2.5, dt);
    g.rotation.x = damp(g.rotation.x, -pointer.y * 0.4 + scrollState.progress * Math.PI, 2.5, dt);
    if (!reduced) mesh.current.rotation.z += dt * 0.08;
    mat.current.color.lerp(k.color, 1 - Math.exp(-3 * dt));
    mat.current.distort = damp(mat.current.distort, reduced ? 0.25 : k.distort, 2, dt);
  });

  return (
    <group ref={group} scale={unit}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1, mobile ? 24 : 48]} />
        <MeshDistortMaterial
          ref={mat}
          color={KEYS[0].color}
          speed={reduced ? 0 : 1.6}
          distort={0.4}
          roughness={0.12}
          metalness={0.35}
          clearcoat={1}
          clearcoatRoughness={0.15}
          iridescence={1}
          iridescenceIOR={1.4}
          iridescenceThicknessRange={[120, 600]}
          envMapIntensity={1.3}
          transparent={mobile}
          opacity={mobile ? 0.55 : 1}
        />
      </mesh>
    </group>
  );
};

// Small glossy shapes that drift past at different depths as you scroll.
const SHAPES = [
  { geo: "torus", x: -0.46, y: 0.34, z: -3, s: 0.24, color: "#c4b5fd", depth: 1.4 },
  { geo: "octa", x: 0.46, y: -0.36, z: -2.2, s: 0.16, color: "#67e8f9", depth: 2.2 },
  { geo: "torus", x: 0.44, y: 0.42, z: -4, s: 0.2, color: "#f9a8d4", depth: 0.9 },
  { geo: "ico", x: -0.47, y: -0.4, z: -3.2, s: 0.15, color: "#86efac", depth: 1.7 },
  { geo: "octa", x: 0.02, y: -0.62, z: -4.5, s: 0.12, color: "#fde68a", depth: 2.6 },
]

const Shapes = ({ reduced }) => {
  const refs = useRef([]);
  const { viewport } = useThree();
  const unit = Math.min(viewport.width, viewport.height);

  useFrame((_, dt) => {
    refs.current.forEach((g, i) => {
      if (!g) return;
      const sh = SHAPES[i];
      const persp = (6 - sh.z) / 6; // camera at z=6
      // Shapes move up faster than the page for a parallax feel, wrapping around.
      const span = viewport.height * 1.6 * persp;
      let y = sh.y * viewport.height * persp + scrollState.progress * sh.depth * viewport.height * 3;
      y = ((((y + span / 2) % span) + span) % span) - span / 2;
      g.position.y = THREE.MathUtils.damp(g.position.y, y, 4, dt);
      g.position.x = sh.x * viewport.width * persp * (viewport.aspect < 0.8 ? 1.1 : 1) + pointer.x * 0.15 * sh.depth;
      if (!reduced) {
        g.rotation.x += dt * 0.2 * sh.depth;
        g.rotation.y += dt * 0.15;
      }
    });
  });

  return SHAPES.map((sh, i) => (
    <Float key={i} speed={reduced ? 0 : 1.2} floatIntensity={0.6} rotationIntensity={0.4}>
      <group ref={(el) => (refs.current[i] = el)} position={[sh.x * viewport.width, sh.y * viewport.height, sh.z]}>
        <mesh scale={sh.s * unit * 0.3}>
          {sh.geo === "torus" && <torusGeometry args={[1, 0.38, 32, 64]} />}
          {sh.geo === "octa" && <octahedronGeometry args={[1, 0]} />}
          {sh.geo === "ico" && <icosahedronGeometry args={[1, 0]} />}
          <meshPhysicalMaterial color={sh.color} roughness={0.15} metalness={0.6} clearcoat={1} envMapIntensity={1.2} />
        </mesh>
      </group>
    </Float>
  ));
};

const Particles = ({ count, reduced }) => {
  const ref = useRef();
  const { viewport } = useThree();
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * viewport.width * 2.2;
      p[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 3;
      p[i * 3 + 2] = -1 - Math.random() * 6;
    }
    return p;
  }, [count]); // eslint-disable-line react-hooks/exhaustive-deps

  useFrame((_, dt) => {
    const pts = ref.current;
    if (!reduced) pts.rotation.y += dt * 0.01;
    pts.position.y = THREE.MathUtils.damp(pts.position.y, scrollState.progress * viewport.height * 0.8, 3, dt);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color='#b9c6ff' transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
};

const Scene = ({ onReady }) => {
  const reduced = prefersReducedMotion();
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Canvas
      dpr={[1, mobile ? 1.5 : 1.75]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => onReady?.()}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      {/* Procedural studio lighting: no HDR download needed. */}
      <Environment resolution={256} frames={1}>
        <Lightformer form='ring' intensity={4} color='#a78bfa' position={[0, 3, -6]} scale={6} />
        <Lightformer form='rect' intensity={3} color='#22d3ee' position={[-6, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form='rect' intensity={3} color='#f472b6' position={[6, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form='circle' intensity={2} color='#ffffff' position={[0, -4, 4]} scale={4} />
      </Environment>
      <Particles count={mobile ? 350 : 800} reduced={reduced} />
      <Shapes reduced={reduced} />
      <Blob reduced={reduced} />
    </Canvas>
  );
};

export default Scene;
