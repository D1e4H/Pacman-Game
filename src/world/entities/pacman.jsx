import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePacmanController } from '../../hooks/keyboard.jsx';

const Pacman = ({ position }) => {
    const meshRef = useRef();

        usePacmanController(meshRef);


    return (
        <group position={position}>
            <mesh ref={meshRef}>
                <sphereGeometry
                    args={[
                        0.4, 32, 32, 0, Math.PI * 2, 0.2, Math.PI - 0.2 * 2,
                    ]}
                />
                <meshStandardMaterial color="yellow" roughness={0.2} metalness={0.1} />
            </mesh>
        </group>
    );
};

export default Pacman;
