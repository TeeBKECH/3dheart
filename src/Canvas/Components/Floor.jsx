import * as THREE from 'three';

const Floor = () => {

  return (
    <mesh
      position={[0, -1.5, 0]}
      receiveShadow
      rotation={[-.5 * Math.PI, 0, 0]}
    >
      <planeGeometry args={[5000, 5000, 1, 1]} />
      <meshPhongMaterial
        color={new THREE.Color(0xf1f1f1)}
        shininess={0}
      />

    </mesh>
  );
}

export default Floor;