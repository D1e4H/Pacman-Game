import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePacmanController } from '../../hooks/keyboard.jsx';
import { useSphere } from '@react-three/cannon';

const Pacman = ({ position }) => {
    const [pacRef, api] = useSphere(() => ({
        mass: 1,
        position: position,
        args: [0.50], // Radio de la esfera física
        type: 'Dynamic',
        material: {
            restitution: 0.5, // Rebote para evitar que se quede atascado en las paredes
            friction: 0, // Sin fricción para un movimiento suave
        },
    }));

        usePacmanController(api);


    return (
            <mesh ref={pacRef}>
                <sphereGeometry
                    args={[
                        0.46, 40, 40, 0, Math.PI * 2, 0.2, Math.PI - 0.2 * 2,
                    ]}
                />
                <meshStandardMaterial color="yellow" roughness={0.2} metalness={0.1} />
            </mesh>
    );
};

export default Pacman;
