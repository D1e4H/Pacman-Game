import {Physics}  from '@react-three/cannon'
import React, { useMemo, useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';
import map from '../../core/map.json';
import Wall from '../environment/wall.jsx';
import Points from '../environment/points.jsx';
import Ghost from '../entities/ghost.jsx'; // Imagina que tienes estos componentes
import Pacman from '../entities/pacman.jsx';

const tempObject = new THREE.Object3D();

const Maze = () => {
    // 1. Validamos que el mapa exista antes de calcular nada
    const { rows, cols, offsetX, offsetY } = useMemo(() => {
        if (!map || !map.mapa || map.mapa.length === 0) {
            return { rows: 0, cols: 0, offsetX: 0, offsetY: 0 };
        }
        const r = map.mapa.length;
        const c = map.mapa[0].length;
        return { 
            rows: r, 
            cols: c, 
            offsetX: c / 2, 
            offsetY: r / 2 
        };
    }, []);

    const { walls, points, pacmanPos } = useMemo(() => {
        // Si no hay filas, retornamos arrays vacíos
        if (rows === 0) return { walls: [], points: [], pacmanPos: [0,0,0] };

        const w = [], p = [];
        let pac = [0, 0, 0];

        map.mapa.forEach((row, rowIndex) => {
            row.split('').forEach((char, colIndex) => {
                const pos = [colIndex - offsetX, -(rowIndex - offsetY), 0];
                if (char === 'W') w.push(pos);
                if (char === '.') p.push(pos);
                if (char === 'P') pac = pos;
            });
        });
        return { walls: w, points: p, pacmanPos: pac };
    }, [rows, offsetX, offsetY]);

    if (walls.length === 0) return null;

    return (
        <Physics gravity={[0, 0, 0]}>
            <Wall count={walls.length} positions={walls} />
            <Points count={points.length} positions={points} />
            <Pacman position={pacmanPos} />
        </Physics>
    );
};
export default Maze;