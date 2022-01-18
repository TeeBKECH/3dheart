import { Suspense, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { extend, useThree } from "react-three-fiber";
import Floor from "./Components/Floor";
import ChairMesh from "./Components/ChairMesh";

extend({OrbitControls});

const Scene = ({newMaterialObt}) => {

  const {
    scene, 
    camera,
    gl: {domElement, shadowMap}
  } = useThree();

  useEffect(() => {
    const directionalLight = scene.children[1];
    scene.background = new THREE.Color(0xf1f1f1);
    scene.fog = new THREE.Fog(0xf1f1f1, 20, 100);
    camera.fov = 50;
    directionalLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
    shadowMap.enabled = true;
    console.log(scene);
  }, [scene, camera, shadowMap]);

  return (
    <>
      <orbitControls args={[camera, domElement]} />
      <hemisphereLight 
        skycolor={new THREE.Color(0xffffff)}
        groundcolor={new THREE.Color(0xffffff)}
        intensity={0.61}
        position={[0, 50, 0]}
      />
      <directionalLight 
        color={new THREE.Color(0xffffff)}
        intensity={0.54}
        position={[-8, 12, 8]}
        castShadow
        mapSize={ new THREE.Vector2(1024, 1024)}
      />
      <Suspense fallback={null}>
        <ChairMesh newMaterialOpt={newMaterialObt} />
        <Floor />
      </Suspense>
    </>
  );
}

export default Scene;