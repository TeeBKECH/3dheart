import { Suspense, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Environment } from '@react-three/drei';
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

  camera.position.set(-3, 0, -3);
  // camera.lookAt(0,0,0);

  useEffect(() => {

    // const bgLoader = new THREE.CubeTextureLoader();
    // bgLoader.setPath( 'bg/' );
    // console.log(bgLoader);
    // let textureCube = bgLoader.load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] );
    // textureCube.encoding = THREE.sRGBEncoding;
    // scene.background = textureCube;

    const directionalLight = scene.children[1];
    // scene.background = new THREE.Color(0x7de1ff);
    // scene.fog = new THREE.Fog(0x7de1ff, 20, 100);
    directionalLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    // shadowMap.enabled = true;
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
        position={[22, 5, 8]}
        castShadow
      />
      <Suspense fallback={null}>
        <Heart newMaterialOpt={newMaterialOpt} />
        {/* <Floor /> */}
        <Environment
          background // Whether to affect scene.background
          files={'venice_sunset_4k.hdr'} // Array of cubemap files OR single equirectangular file
          path={'/bg/hdr/'} // Path to the above file(s)
          preset={null} // Preset string (overrides files and path)
          scene={scene} // adds the ability to pass a custom THREE.Scene
        />
      </Suspense>
    </>
  );
}

export default Scene;