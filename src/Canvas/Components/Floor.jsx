import * as THREE from 'three';

const Floor = () => {

  return (
    <mesh
      position={[0, -3, 0]}
      receiveShadow
      rotation={[-.5 * Math.PI, 0, 0]}
    >
      <planeGeometry args={[5000, 5000, 1, 1]} />
      <meshPhongMaterial
        color={new THREE.Color(0xfffea9)}
        shininess={0}
      />

    </mesh>
  );
}

export default Floor;