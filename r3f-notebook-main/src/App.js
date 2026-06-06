import ReactDOM from 'react-dom'
import { Canvas , useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import ExperienceLesson1 from './demo/ExperienceLesson1'
import { Leva } from "leva";
import * as THREE from 'three';
import CameraControls  from './common/CameraControls'

function App() {

  const [cameraPosition ,setcameraPosition]= useState([2, 5, -20])

  return (
    <div id="canvas-container" > 

 
     {/* <Leva collapsed/> */}
    <Canvas style={ {height:'600px'}} > 
      <ExperienceLesson1 />
   </Canvas>



    {/* <Canvas style={ {height:'600px'}}

    // flat
 //   camera={ {fov:75 ,  position:cameraPosition} }
    dpr={2}
       gl={ { antialias:true , toneMapping:THREE.CineonToneMapping}}   > 
       <CameraControls />
           <ExperienceLesson1 />
   </Canvas> */}


      {/* <Canvas>
        <mesh rotation-y={2} position={[1,0,0]} scale={ [1,1,1 ] }>
          <sphereGeometry args={[1.5,32,32]} />
          <meshNormalMaterial args={ [{ color:'red',wireframe:true}] } />
        </mesh>
      </Canvas>

      <Canvas>
        <mesh  ref={cubeRef} rotation-y={2} position={[1,2,1]} scale={ [1,1,1 ] }>
          <boxGeometry />
          <meshNormalMaterial args={ [{ color:'red',wireframe:true}] } />
        </mesh>
      </Canvas> */}
    </div>
  )
}


export default App;
