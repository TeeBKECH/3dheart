import { Suspense, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { extend, useThree } from "react-three-fiber";
import Floor from "./Components/Floor";
import Heart from "./Components/Heart";

extend({OrbitControls});

const Scene = ({newMaterialOpt}) => {

  const {
    scene, 
    camera,
    gl: {domElement, shadowMap}
  } = useThree();

  useEffect(() => {

    const bgLoader = new THREE.CubeTextureLoader();
    bgLoader.setPath( 'bg/' );
    console.log(bgLoader);
    let textureCube = bgLoader.load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] );
    textureCube.encoding = THREE.sRGBEncoding;
    scene.background = textureCube;

    const directionalLight = scene.children[1];
    // scene.background = new THREE.Color(0x7de1ff);
    // scene.fog = new THREE.Fog(0x7de1ff, 20, 100);
    directionalLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    shadowMap.enabled = true;
    // console.log(scene);
  }, []);

  return (
    <>
      <orbitControls args={[camera, domElement]} />
      <hemisphereLight 
        skyColor = {new THREE.Color(0xffffff)}
        groundColor={new THREE.Color(0x000000)}
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
        <Heart newMaterialOpt={newMaterialOpt} />
        {/* <Floor /> */}
      </Suspense>
    </>
  );
}

export default Scene;