import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const usePacmanController = (meshRef) => {
    const keys = useRef({});

    useEffect(() => {
        const handleDown = (e) => keys.current[e.key.toLowerCase()] = true;
        const handleUp = (e) => keys.current[e.key.toLowerCase()] = false;
        
        window.addEventListener('keydown', handleDown);
        window.addEventListener('keyup', handleUp);
        return () => {
            window.removeEventListener('keydown', handleDown);
            window.removeEventListener('keyup', handleUp);
        };
    }, []);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        const speed = 5 * delta; // Velocidad ajustada al tiempo entre frames

        if (keys.current['w'] || keys.current['arrowup'])    meshRef.current.position.y += speed;
        if (keys.current['s'] || keys.current['arrowdown'])  meshRef.current.position.y -= speed;
        if (keys.current['a'] || keys.current['arrowleft'])  meshRef.current.position.x -= speed;
        if (keys.current['d'] || keys.current['arrowright']) meshRef.current.position.x += speed;
        
        // Un detalle visual: podrías rotar el mesh hacia donde camina
        if (keys.current['a']) meshRef.current.rotation.z = Math.PI;
        if (keys.current['d']) meshRef.current.rotation.z = 0;
        if (keys.current['w']) meshRef.current.rotation.z = Math.PI / 2;
        if (keys.current['s']) meshRef.current.rotation.z = -Math.PI / 2;
    });
};

export { usePacmanController };