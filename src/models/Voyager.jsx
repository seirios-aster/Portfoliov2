import { useEffect, useRef } from "react";
import { useFrame, useLoader  } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { TextureLoader } from 'three';
import airship from "../assets/3d/airship.glb";
import me from '../assets/images/pp.jpg';

export function Voyager({position}) {
  const airshipRef = useRef();
  const moveDirection = useRef(1);
  const texture = useLoader(TextureLoader, me);  // Adjust path as necessary

  // Load the 3D model and animations from the provided GLTF file
  const { scene, animations } = useGLTF(airship);

  // Play the "Take 001" animation when the component mounts
  // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
  useEffect(() => {
    texture.center.set(0.5, 0.5);
    texture.offset.set(0, 0.12);
    texture.rotation = Math.PI / 2;
    scene.traverse((child) => {
      if (child.isMesh && child.name == 'polySurface253_lambert6_0') {
        child.material.map = texture;
        child.material.needsUpdate = true;
      }
      
      if (child.isMesh && (child.name == 'polySurface263_red_wood_0' ||
                           child.name == 'pTorus21_red_wood_0')) {
                             child.parent.remove(child);
                           }

      if (child.isMesh && child.name == 'pTorus3_crate_wood_0') {
        child.parent.remove(child);
      }
    });
      
  }, [scene, texture]);

  useFrame(({ clock, camera }) => {
    if (airshipRef.current) {
      // Rotate the model to face sideways
      airshipRef.current.rotation.y = Math.PI / 2;

      // Update position based on direction
      airshipRef.current.position.x += 0.01 * moveDirection.current;
      airshipRef.current.position.z = 0.01; // Keep z position constant

      if (moveDirection.current === 1) {
        airshipRef.current.rotation.y = Math.PI / 2; // Facing right
      } else {
        airshipRef.current.rotation.y = -Math.PI / 2; // Facing left
      }

      // Define boundaries for the x position
      const maxBoundary = 5; // Define max boundary
      const minBoundary = -5; // Define min boundary

      // Check if the model has reached either boundary and reverse direction if it has
      if (airshipRef.current.position.x > maxBoundary || airshipRef.current.position.x < minBoundary) {
        moveDirection.current *= -1; // Reverse the direction

      }
    }
  });

  return (
    // to create and display 3D objects
    <mesh ref={airshipRef} position={position} scale={.01}>
      // use the primitive element when you want to directly embed a complex 3D
      model or scene
      <boxGeometry args={[1, 1, 1]} />
      <primitive object={scene} />
      <meshPhongMaterial  map={texture} />
    </mesh>
  );

}