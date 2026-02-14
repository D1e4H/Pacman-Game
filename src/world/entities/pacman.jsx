import React, { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePacmanController } from '../../hooks/keyboard.jsx';
import { useSphere } from '@react-three/cannon';

const Pacman = ({ position }) => {
    const [pacRef, api] = useSphere(() => ({
        name: 'pacman',
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
    useEffect(() => {
        
        const handleTeleport = (e) => {
            // Solo respondemos si el UUID del evento coincide con nuestro cuerpo físico
            if (e.detail.uuid === pacRef.current.uuid) {
                console.log("¡Soy yo! Saltando...");
                api.velocity.set(0, 0, 0);
                api.position.set(...e.detail.target);
            }
        };

        window.addEventListener('ENTITY_TELEPORT', handleTeleport);
        return () => window.removeEventListener('ENTITY_TELEPORT', handleTeleport);
    }, [api]); // Importante vincular a la API


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
