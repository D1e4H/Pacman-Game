import React, { useMemo, useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';
import map from '../../core/map.json';
import Wall from '../environment/wall.jsx';
import Points from '../environment/points.jsx';
import Ghost from '../entities/ghost.jsx'; // Imagina que tienes estos componentes
import Pacman from '../entities/pacman.jsx';

const tempObject = new THREE.Object3D();

const Maze = () => {
    const { rows, cols } = useMemo(() => ({
        rows: map.mapa.length,
        cols: map.mapa[0].length
    }), []);
    
    const offsetX = cols / 2;
    const offsetY = rows / 2;

    const { walls, points, ghosts, abilities, pacmanPos } = useMemo(() => {
        const w = [], p = [], g = [], h = [];
        let pac = [0, 0, 0];

        map.mapa.forEach((row, rowIndex) => {
            row.split('').forEach((char, colIndex) => {
                const pos = [colIndex - offsetX, -(rowIndex - offsetY), 0];
                if (char === 'W') w.push(pos);
                if (char === '.') p.push(pos);
                if (char === 'H') h.push(pos);
                if (char === 'G') g.push(pos); // Fantasmas
                if (char === 'P') pac = pos;   // Posición inicial Pacman
            });
        });
        return { walls: w, points: p, ghosts: g, abilities: h, pacmanPos: pac };
    }, [offsetX, offsetY]);

    const wallRef = useRef();
    const pointRef = useRef();

    useLayoutEffect(() => {
        walls.forEach((pos, i) => {
            tempObject.position.set(...pos);
            tempObject.updateMatrix();
            wallRef.current.setMatrixAt(i, tempObject.matrix);
        });
        wallRef.current.instanceMatrix.needsUpdate = true;

        points.forEach((pos, i) => {
            tempObject.position.set(...pos);
            tempObject.updateMatrix();
            pointRef.current.setMatrixAt(i, tempObject.matrix);
        });
        pointRef.current.instanceMatrix.needsUpdate = true;
    }, [walls, points]);

    return (
        <>
            <Wall ref={wallRef} count={walls.length} />

            <Points ref={pointRef} count={points.length} />

            <Pacman position={pacmanPos} />

        </>
    );
};

export default Maze;