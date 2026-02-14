import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const usePacmanController = (api) => {
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

    const pos = useRef([0, 0, 0]);
    useEffect(() => api.position.subscribe(p => pos.current = p), [api]);

    useFrame(() => {
        if (!api) return;

        const speed = 5;
        let vX = 0;
        let vY = 0;

        if (vX !== 0) {
            // Si se mueve en X, forzamos que Y esté en el centro del pasillo (ej: .0)
            api.position.set(pos.current[0], Math.round(pos.current[1]), 0);
        }
        if (vY !== 0) {
            // Si se mueve en Y, forzamos que X esté en el centro
            api.position.set(Math.round(pos.current[0]), pos.current[1], 0);
        }

        if (keys.current['a'] || keys.current['arrowleft']) {
            vX = -speed;
            vY = 0;


        } else if (keys.current['d'] || keys.current['arrowright']) {
            vX = speed;
            vY = 0;
        } else if (keys.current['w'] || keys.current['arrowup']) {
            vY = speed;
            vX = 0;
        } else if (keys.current['s'] || keys.current['arrowdown']) {
            vY = -speed;
            vX = 0;
        }

        api.velocity.set(vX, vY, 0);


    });
};

export { usePacmanController };