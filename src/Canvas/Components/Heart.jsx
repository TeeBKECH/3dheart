import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, useFrame } from 'react-three-fiber';
import { useRef } from 'react';

const Heart = (props) => {
  const {scene: theModel} = useLoader(GLTFLoader, 'heart.glb');
  const chair = useRef(theModel);

  useFrame((state, delta) => (chair.current.rotation.y += 0.005))

  return (
    <primitive
      {...props}
      ref={chair}
      object={theModel}
      scale={[1, 1, 1]}
      rotation={[0, 0, 0]}
      receiveShadow={true}
      castShadow={true}
    >
    </primitive>
  );
}

export default Heart;