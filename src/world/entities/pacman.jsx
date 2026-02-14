import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { pacmanController } from '../../hooks/keyboard';

const Pacman = ({ wallsRef, ...props }) => {
    const meshRef = useRef();
    const [mouthOpen, setMouthOpen] = useState(0);
    const pacmanBox = new THREE.Box3();
    let opening = true;

    // Crea un Raycaster y una dirección de movimiento para Pacman
    const raycaster = new THREE.Raycaster();
    const direction = new THREE.Vector3(0, 1, 0); // Dirección de movimiento (por ejemplo, hacia arriba)

    // Función de animación para abrir y cerrar la boca
    useFrame((state, delta) => {
        const speed = delta * 5;

        // Animación de la boca
        if (opening) {
            setMouthOpen((prev) => {
                if (prev >= 0.8) opening = false;
                return prev + speed;
            });
        } else {
            setMouthOpen((prev) => {
                if (prev <= 0.1) opening = true;
                return prev - speed;
            });
        }

        // Actualizamos la rotación de Pacman (si es necesario)
        if (meshRef.current) meshRef.current.rotation.y = Math.PI / 2;

        // Actualizamos la caja de colisión de Pacman en cada fotograma
        if (meshRef.current) {
            pacmanBox.setFromObject(meshRef.current);
        }

        // Posicionamos el Raycaster en la posición de Pacman
        if (meshRef.current) {
            raycaster.update(meshRef.current.position, direction);
        }

        const hit = checkCollisionWithRay(raycaster);
        if (!hit) {
            pacmanController(); 
        }
    });

    const checkCollisionWithRay = (raycaster) => {
        const walls = wallsRef; 
        
        raycaster.update(meshRef.current.position, direction);
        
        const intersects = raycaster.intersectObjects(walls); // Comprobamos si el rayo choca con algún objeto
        if (intersects.length > 0) {
            console.log('Colisión detectada con una pared');
            return true; // Si hay colisión, devolvemos true
        }

        return false; // Si no hay colisiones
    };

    return (
        <group {...props}>
            <mesh ref={meshRef}>
                <sphereGeometry
                    args={[
                        0.4, 32, 32, 0, Math.PI * 2, mouthOpen, Math.PI - mouthOpen * 2,
                    ]}
                />
                <meshStandardMaterial color="yellow" roughness={0.2} metalness={0.1} />
            </mesh>
        </group>
    );
};

export default Pacman;
