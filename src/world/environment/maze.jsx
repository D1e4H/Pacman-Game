import { Physics } from '@react-three/cannon';
import React, { useMemo } from 'react';
import map from '../../core/map.json';
import Wall from '../environment/wall.jsx';
import Points from '../environment/points.jsx';
import Pacman from '../entities/pacman.jsx';
import { Portal } from '../environment/portal.jsx';

const Maze = () => {
    // 1. Cálculos de dimensiones
    const { rows, cols, offsetX, offsetY } = useMemo(() => {
        if (!map || !map.mapa || map.mapa.length === 0) {
            return { rows: 0, cols: 0, offsetX: 0, offsetY: 0 };
        }
        const r = map.mapa.length;
        const c = map.mapa[0].length;
        return { rows: r, cols: c, offsetX: c / 2, offsetY: r / 2 };
    }, []);

    // 2. Procesamiento del mapa (Extracción de posiciones)
    const { walls, points, pacmanPos, portals } = useMemo(() => {
        if (rows === 0) return { walls: [], points: [], pacmanPos: [0, 0, 0], portals: [] };

        const w = [], p = [], port = [];
        let pac = [0, 0, 0];

        map.mapa.forEach((row, rowIndex) => {
            row.split('').forEach((char, colIndex) => {
                const pos = [colIndex - offsetX, -(rowIndex - offsetY), 0];
                if (char === 'W') w.push(pos);
                if (char === '.') p.push(pos);
                if (char === 'P') pac = pos;
                if (char === 't') port.push(pos); 
            });
        });
        return { walls: w, points: p, pacmanPos: pac, portals: port };
    }, [rows, offsetX, offsetY]);

    if (walls.length === 0) return null;

    return (
        <Physics gravity={[0, 0, 0]}>
            {/* Lógica de Portales */}
            {portals.length >= 2 && (
                <>
                    <Portal 
                        position={[portals[0][0] - 1, portals[0][1], 0]} 
                        targetPosition={[portals[1][0] , portals[1][1], 0]} 
                    />
                    <Portal 
                        position={[portals[1][0] + 1, portals[1][1], 0]} 
                        targetPosition={[portals[0][0] , portals[0][1], 0]} 
                    />
                </>
            )}

            <Wall count={walls.length} positions={walls} />
            <Points count={points.length} positions={points} />
            <Pacman position={pacmanPos} />
        </Physics>
    ); // Aquí cierra el return
}; // AQUÍ debe cerrar la función Maze

export default Maze;