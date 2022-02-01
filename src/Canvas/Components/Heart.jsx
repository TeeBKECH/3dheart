import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, useFrame } from 'react-three-fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const INITIAL_MTL = new THREE.MeshPhongMaterial({
  color: new THREE.Color(0x000000),
  shininess: 40
});

const INITIAL_MAP = [
  {childID: "heart", mtl: INITIAL_MTL},
  {childID: "text1", mtl: INITIAL_MTL},
  {childID: "text2", mtl: INITIAL_MTL},
  {childID: "text3", mtl: INITIAL_MTL}
];

const initColor = (parent, type, mtl) => {
  parent.traverse(o => {
    if (o.isMesh && o.name.includes(type)) {
      o.castShadow = true;
      o.receiveShadow = true;
      o.material = mtl;
      o.nameID = type;
    }
  });
}

const Heart = ({newMaterialOpt}) => {
  const {scene: theModel} = useLoader(GLTFLoader, 'heart.gltf');
  const heart = useRef(theModel);

  useFrame((state, delta) => (heart.current.rotation.y += 0.005));

  useEffect(() =>
    void setMaterial(newMaterialOpt.activeOption, newMaterialOpt.newMTL)
  , [newMaterialOpt.newMTL]);

  useEffect(() => {
    if (theModel) {
      for (let object of INITIAL_MAP) {
        initColor(theModel, object.childID, object.mtl);
      }
    }
  }, [theModel])

  const setMaterial = (type, mtl) => {
    theModel.traverse(o => {
      if (o.isMesh && o.nameID != null) {
        if (o.nameID === type) {
          o.material = mtl;
        }
      }
    });
  }

  // console.log(newMaterialOpt);

  return (
    <primitive
      position={[0, 0, 0]}
      ref={heart}
      object={theModel}
      scale={[1, 1, 1]}
      rotation={[0, 0, 0]}
      receiveShadow
      castShadow
    >
    </primitive>
  );
}

export default Heart;