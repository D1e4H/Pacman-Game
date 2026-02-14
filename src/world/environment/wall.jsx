import React from 'react';
import { useBox } from '@react-three/cannon';

const Wall = ({ count, positions }) => {
    // useBox crea un cuerpo físico para cada instancia automáticamente
    const [ref] = useBox((index) => ({
        type: 'Static',
        position: positions[index],
        args: [1, 1, 1], // Tamaño de la caja de colisión
    }));

    return (
        <instancedMesh ref={ref} args={[null, null, count]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="blue" />
        </instancedMesh>
    );
};

export default Wall;