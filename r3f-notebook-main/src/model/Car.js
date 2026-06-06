import React, { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from 'three';

// export default function Car () {
//   const cars = useGLTF('./2021_lamborghini_countach_lpi_800-4.glb');

//   console.log(Car)

//   return (
//     <>
//       <primitive
//         object={cars.scene}
//         scale={2}
//         position={[-2.5, 0, 2.5]}
//         rotate={0.3}
//       />
//     </>
//   );
// };

export default function Car() {
  const cars = useGLTF('./2021_lamborghini_countach_lpi_800-4.glb');
  const furina = useGLTF('./genshin_impact_-_furina.glb');
  useEffect(() => {
    if (cars.scene) {
      // 遍历场景中的所有对象
      cars.scene.traverse((child) => {
        // 检查是否是网格对象
        if (child instanceof THREE.Mesh) {
          // 生成随机颜色
          const randomColor = new THREE.Color(
            Math.random(),
            Math.random(),
            Math.random()
          );
          
          console.log(child.name)

          if(child.name==='Object_29'){
        //    child.scale.set(1,5,1);
          }
          // 如果材质是数组，遍历所有材质
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => {
              material.color = randomColor;
              material.needsUpdate = true;
            });
          } 
          // 如果是单个材质
          else if (child.material) {
            child.material.color = randomColor;
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [cars.scene]);

  return (
    <>
    <primitive
      object={cars.scene}
      scale={10}
      positon={[-10,1,1]}
    />

    {/* <primitive
      object={furina.scene}
      scale={2}
      positon={[20,1,1]}
      rotation={[0,380,0]}
    /> */}

    </>
  );
}

// export default function Car(props) {
//   const { nodes, materials } = useGLTF('./2021_lamborghini_countach_lpi_800-4.glb');

//   console.log(nodes)
//   console.log(materials)

//   return (
//     <group {...props} dispose={null}>
//       <mesh
//         name="Object_6"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_6.geometry}
//   //      material={materials.BunMaterial}
//         position={[0, -1.25, 0]}
//       />
//       <mesh
//         name="Object_2"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_2.geometry}
//     //    material={materials.SteakMaterial}
//         position={[0, 1.817, 0]}
//       />
//       <mesh
//         name="Object_3"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_3.geometry}
// //        material={materials.CheeseMaterial}
//         position={[0, 2.04, 0]}
//       />
//       <mesh
//         name="Object_4"
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_4.geometry}
//    //     material={materials.BunMaterial}
//         position={[0, 1.771, 0]}
//       />
//     </group>
//   );
// };


