import { OrthographicCamera } from '@react-three/drei'
import Maze from '../world/environment/maze.jsx'
import { Canvas, useFrame } from '@react-three/fiber'


const GameScene = () => {
    return (
        <> 
            <Canvas className="w-full h-full bg-black">
                <OrthographicCamera
                    makeDefault
                    position={[0, 0, 10]}
                    zoom={20}
                />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />

                <Maze />
            </Canvas>
        </>
    )
}

export default GameScene