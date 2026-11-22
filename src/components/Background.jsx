import { Component, Suspense, lazy, useState } from "react";

const Scene = lazy(() => import("../three/Scene"));

const hasWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
};

// If the 3D scene throws (driver issue, context loss on init), keep the CSS fallback.
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    console.warn("3D scene disabled:", err);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const Background = () => {
  const [webgl] = useState(hasWebGL);
  const [ready, setReady] = useState(false);

  return (
    <div aria-hidden='true' className='pointer-events-none fixed inset-0 z-0 overflow-hidden'>
      <div className='bg-aurora absolute inset-0' />
      <div className={`css-blob transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`} />
      {webgl && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <div className={`absolute inset-0 transition-opacity duration-[1500ms] ${ready ? "opacity-100" : "opacity-0"}`}>
              <Scene onReady={() => setReady(true)} />
            </div>
          </Suspense>
        </SceneBoundary>
      )}
      <div className='bg-noise absolute inset-0' />
      <div className='bg-vignette absolute inset-0' />
    </div>
  );
};

export default Background;
