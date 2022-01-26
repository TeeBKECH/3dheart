import { Suspense, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { extend, useThree } from "react-three-fiber";
import Floor from "./Components/Floor";
import Heart from "./Components/Heart";

extend({OrbitControls});

const Scene = () => {

  const {
    scene, 
    camera,
    gl: {domElement, shadowMap}
  } = useThree();

  camera.position.set(0, 2, 4);

  useEffect(() => {
    const directionalLight = scene.children[1];
    scene.background = new THREE.Color(0xf1f1f1);
    scene.fog = new THREE.Fog(0xf1f1f1, 20, 100);
    camera.fov = 50;
    camera.near = 20;
    directionalLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
    shadowMap.enabled = true;
    console.log(camera);
  }, [scene, camera, shadowMap]);

  return (
    <>
      <orbitControls args={[camera, domElement]} />
      <hemisphereLight 
        skyColor = {new THREE.Color(0x47ffd7)}
        groundColor={new THREE.Color(0x47ffd7)}
        intensity={0.61}
        position={[0, 50, 0]}
      />
      <directionalLight 
        color={new THREE.Color(0xffffff)}
        intensity={0.54}
        position={[-8, 5, 8]}
        castShadow
      />
      <Suspense fallback={null}>
        <Heart position={[0, 0, 0]} />
        <Floor />
      </Suspense>
    </>
  );
}

export default Scene;