import React, { useEffect, useRef } from 'react';
import map from '../../core/map.json';
import Pacman from '../entities/pacman.jsx';
import Wall from '../environment/wall.jsx';
import Points from '../environment/points.jsx';

const Maze = () => {
    const rows = map.mapa.length;
    const cols = map.mapa[0].length;
    const offsetX = cols / 2;
    const offsetY = rows / 2;

    const wallsRef = useRef([]); // Ref para almacenar las referencias de las paredes

    // Esta función es para agregar las referencias de las paredes al array
    const addWallRef = (ref) => {
        if (ref && !wallsRef.current.includes(ref)) {
            wallsRef.current.push(ref);
        }
    };

    return (
        <group name="Maze_2D">
            {map.mapa.map((row, rowIndex) =>
                row.split('').map((char, colIndex) => {
                    // En 2D usamos X e Y. 
                    // Invertimos rowIndex (multiplicando por -1) para que la primera fila salga arriba.
                    const x = colIndex - offsetX;
                    const y = -(rowIndex - offsetY);

                    if (char === 'W') {
                        return (
                            <Wall
                                key={`${rowIndex}-${colIndex}`}
                                ref={addWallRef} // Agregar cada referencia de pared al array
                                position={[x, y, 0]}
                            />
                        );
                    }
                    if (char.trim() === 'P') {
                        return (
                            <Pacman
                                key={`${rowIndex}-${colIndex}`}
                                wallsRef={wallsRef.current} // Pasamos el array de paredes como prop
                                position={[x, y, 0]}
                            />
                        );
                    }
                    if (char.trim() === '.') {
                        return (
                            <Points key={`${rowIndex}-${colIndex}`} position={[x, y, 0]} />
                        );
                    }

                })
            )}
        </group>
    );
};

export default React.forwardRef(Maze);
