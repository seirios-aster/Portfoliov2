import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";

import sakura from "../assets/sakura.mp3";
import { HomeInfo, Loader } from "../components";
import { CoachMark, IslandControls } from "../components/IslandGuide";
import { soundoff, soundon } from "../assets/icons";
import { Bird, Island, Plane, Sky, Voyager } from "../models";

const HINT_KEY = "island-hint-seen";

const markSeen = () => {
  try {
    localStorage.setItem(HINT_KEY, "1");
  } catch {
    /* storage blocked */
  }
};

const readSeen = () => {
  try {
    return localStorage.getItem(HINT_KEY) === "1";
  } catch {
    return false; // storage blocked: just show the hint
  }
};

// Rendered inside <Suspense>: it only mounts once the 3D assets have loaded.
const OnReady = ({ onReady }) => {
  useEffect(() => {
    onReady();
  }, [onReady]);
  return null;
};

const Home = () => {
  const audioRef = useRef(null);
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const [hasInteracted, setHasInteracted] = useState(false);
  const [ready, setReady] = useState(false);
  const [firstVisit] = useState(() => !readSeen());
  const [helpOpen, setHelpOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [nudge, setNudge] = useState(0);
  const [lastStage, setLastStage] = useState(1);
  const coarse = typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches;
  const markReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(sakura);
      audioRef.current.volume = 0.4;
      audioRef.current.loop = true;
    }
    const audio = audioRef.current;

    if (isPlayingMusic) {
      // play() can reject (autoplay policy); fall back to "off" instead of throwing.
      audio.play().catch(() => setIsPlayingMusic(false));
    } else {
      audio.pause();
    }

    return () => audio.pause();
  }, [isPlayingMusic]);

  // First interaction: remember it so returning visitors skip the big hint.
  useEffect(() => {
    if (!isRotating) return;
    setHasInteracted(true);
    setHelpOpen(false);
    markSeen();
  }, [isRotating]);

  // Keep showing the last stop on the indicator while the island is between stops.
  useEffect(() => {
    if (currentStage) setLastStage(currentStage);
  }, [currentStage]);

  // New visitors who do nothing for a few seconds get one gentle spin to show it moves.
  useEffect(() => {
    if (!ready || !firstVisit || hasInteracted || dismissed) return;
    const t = setTimeout(() => setNudge(1), 4000);
    return () => clearTimeout(t);
  }, [ready, firstVisit, hasInteracted, dismissed]);

  const showCoach = ready && ((firstVisit && !hasInteracted && !dismissed) || helpOpen);
  const closeCoach = () => {
    setHelpOpen(false);
    setDismissed(true);
    markSeen();
  };

  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;

    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition];
  };

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
        dpr={[1, 1.75]}
      >
        <Suspense fallback={<Loader />}>
          <OnReady onReady={markReady} />
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight
            skyColor='#b1e1ff'
            groundColor='#000000'
            intensity={1}
          />

          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            nudge={nudge}
            position={islandPosition}
            rotation={[0.1, 4.7077, 0]}
            scale={islandScale}
          />
          <Plane
            isRotating={isRotating}
            position={biplanePosition}
            rotation={[0, 20.1, 0]}
            scale={biplaneScale}
          />
          <Voyager position={[2, 2, 0]} />
        </Suspense>
      </Canvas>

      {showCoach && <CoachMark coarse={coarse} onClose={closeCoach} />}
      {ready && <IslandControls stage={currentStage} lastStage={lastStage} />}

      <button
        type='button'
        onClick={() => setIsPlayingMusic(!isPlayingMusic)}
        aria-label={isPlayingMusic ? "Turn music off" : "Turn music on"}
        aria-pressed={isPlayingMusic}
        className='absolute bottom-2 left-2'
      >
        <img src={!isPlayingMusic ? soundoff : soundon} alt='' className='w-10 h-10 object-contain' />
      </button>

      <button
        type='button'
        onClick={() => setHelpOpen((v) => !v)}
        aria-label='How to explore the island'
        aria-expanded={showCoach}
        className='absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-lg font-bold text-blue-600 shadow-md backdrop-blur hover:bg-blue-500 hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300'
      >
        ?
      </button>
    </section>
  );
};

export default Home;
