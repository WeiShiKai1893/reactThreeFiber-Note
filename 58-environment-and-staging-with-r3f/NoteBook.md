toadd sahdow

```
 <Canvas
        shadows
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ - 4, 3, 6 ]
        } }
    >
        <Experience />
    </Canvas>


 <directionalLight ref={ directionalLight } castShadow position={ [ 1, 2, 3 ] }   intensity={ 4.5 } />
       


<mesh  castShadow position-x={ - 2 }>
    <sphereGeometry />
    <meshStandardMaterial color="orange" />
</mesh>

<mesh castShadow ref={ cube }  position-x={ 2 } scale={ 1.5 }>
    <boxGeometry />
    <meshStandardMaterial color="mediumpurple" />
</mesh>

<mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
    <planeGeometry />
    <meshStandardMaterial color="greenyellow" />
</mesh>


```

引用 <BakeShadows />。 一旦shadow被初次渲染 不再更新
```

import {  BakeShadows,useHelper, OrbitControls } from '@react-three/drei'


        <BakeShadows />
```

 随机的环境光

 ```
import {  RandomizedLight,AccumulativeShadows, BakeShadows,useHelper, OrbitControls, SoftShadows } from '@react-three/drei'


<AccumulativeShadows
    position={ [ 0, -1, 0 ] }
    scale={ 10 }
    color="#316d39"
    opacity={ 0.8 }
    frame={ 100 }
>
<RandomizedLight 
amount={ 8 } radius={ 1 } ambient={ 0.5 } intensity={ 1 }
    position={ [ 1, 2, 3 ] } bias={ 0.001 }
/>

</AccumulativeShadows>

 ```

添加环境，并给环境的某些方向添加特定反光
```
      <Environment background preset="city" >
          
            <mesh scale={ 10 } position-z={ - 5 }>
                  <planeGeometry  />
                <meshBasicMaterial color="red" />
            </mesh>
        </Environment>

```

```
<Environment background 
//preset="city"
>
    <color attach="background" args={ [ 'blue' ] } />    
    <Lightformer position-z={ -5 } scale={ 10 }
    color="white" intensity={ 1 } form="ring"
    />

    <Lightformer position-x={ -5 } scale={ 10 }
    color="blue" intensity={ 1 } form="circle" 
    />

    <Lightformer position-y={ -5 } scale={ 10 }
    color="cyan" intensity={ 1 } form="plane"
    />
    
{/* <mesh scale={ 10 } position-z={ - 5 }>
        <planeGeometry  />
    <meshBasicMaterial color="red" /> 
    <meshBasicMaterial color={{ r: 2, g: 0, b: 0 }} /> 
</mesh> */}

</Environment>
```

方便调整具体环境参数
```
    const { envMapIntensity, envmapheight, envmapradius, envmapscale } = useControls('environment map', {
        envMapIntensity: { value: 1.5, min: 0, max: 12 },
        envmapheight: { value: 5, min: 0, max: 10 },
        envmapradius: { value: 40, min: 0, max: 100 },
        envmapscale: { value: 100, min: 0, max: 200 },
    })

            <Environment ground={{ height: envmapheight, radius: envmapradius, scale: envmapscale }}
            preset="city">

        </Environment>
```
快速搭建场景
```
<Stage 
    contactshadow= {{opacity: 0.5, blur: 2 }}
    environment={"city"}
    preset="portrait"
>

        <mesh  castShadow position-x={ -2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow ref={ cube }  position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
</Stage>

```