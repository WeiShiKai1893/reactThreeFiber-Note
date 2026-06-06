import { useThree } from '@react-three/fiber';
import {Vector3 }  from 'three';
import { Html } from '@react-three/drei'

export default function CameraControls() {
  const { camera } = useThree();
  
  // 相机位置预设
  const views = {
    front: new Vector3(-5, 5, -20),  // 正面
    side: new Vector3(10, 0, 0),   // 侧面
    back: new Vector3(0, 2, 20)   // 背面
  };
  
  // 切换相机位置
  const setCameraPosition = (position) => {
    camera.position.copy(position);
    camera.lookAt(0, 0, 0); // 始终看向场景中心
  };
  

  
  return (
            <Html>

                   <div >
      <button onClick={() => setCameraPosition(views.front)}>正面</button>
      <button onClick={() => setCameraPosition(views.back)}>背面</button>
      <button onClick={() => setCameraPosition(views.side)}>侧面</button>
   </div>


    </Html>
  );
}