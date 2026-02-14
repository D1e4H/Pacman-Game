import React, { useRef } from 'react';
import Wall from '../environment/wall.jsx';
import map from '../../core/map.json';

const Maze = ({ onCollision }) => {
    const rows = map.mapa.length;
    const cols = map.mapa[0].length;
    const offsetX = cols / 2;
    const offsetY = rows / 2;


    return (
        <group name="Maze_2D">
            {map.mapa.map((row, rowIndex) => (
                row.split('').map((char, colIndex) => {
                    const x = colIndex - offsetX;
                    const y = -(rowIndex - offsetY);

                    if (char === 'W') {
                        
                        return (
                            <Wall
                                key={`${rowIndex}-${colIndex}`}
                                position={[x, y, 0]}
                            />
                        );
                    }
                    return null;
                })
            ))}
        </group>
    );
};

export default Maze;
