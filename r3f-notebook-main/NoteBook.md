添加一段3d文字

``` JS
 {/* Text */}
            <Float speed={5} floatIntensity={2}>
                <Text
                  //  font="./bangers-v20-latin-regular.woff"
                    fontSize={1}
                    color="salmon"
                    position-y={4}
                    maxWidth={8}
                    textAlign="center"
                    onClick={()=>{
                        console.log('click this text')
                        window.alert('Thanks your click! ^_^ ')
                    }}
                >
                    I Love R3F
                    {/* <meshNormalMaterial /> */}
                </Text>
            </Float>
```

设置物体旋转与自旋转
``` JS
const cubeRef = useRef();
const groupRef = useRef();
// This function is called on every frame render
useFrame((state, delta) => {
    // 设置物体自旋转
    cubeRef.current.rotation.y += delta * 4;
    groupRef.current.rotation.y += delta * 0.5;
});

 <group ref={groupRef}>
    <mesh position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
    </mesh>
    <mesh
        ref={cubeRef}
        rotation-y={Math.PI * 0.25}
        position-x={6}
        scale={1.5}
    >
        <boxGeometry scale={1.5} />
        <meshStandardMaterial color="mediumpurple" wireframe={false} />
    </mesh>
</group>


```


设置动画

```
原生动画可以这样的思路
const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // mesh.rotation.y = Math.sin(elapsedTime)
    // mesh.rotation.x = Math.cos(elapsedTime)

    camera.position.x = Math.cos(elapsedTime)
    camera.position.y = Math.sin(elapsedTime)
    camera.lookAt(mesh.position)

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
    // Update objects
}
tick()

或者用 gaspe 动画库来做动画，例如：
gasp.to(cubeRef.current.rotation, { y: Math.PI * 2 }, { duration: 1000 })

```