import React from 'react';
import { useBox } from '@react-three/cannon';

export const Portal = ({ position, targetPosition, args = [1, 2, 1] }) => {
    const [ref] = useBox(() => ({
        isTrigger: true,
        type: 'Static',
        position: position,
        args: args,
        onCollide: (e) => {
            if (e.body && e.body.uuid) {
                console.log("Entidad detectada, solicitando salto...");
                window.dispatchEvent(new CustomEvent('ENTITY_TELEPORT', {
                    detail: { 
                        uuid: e.body.uuid, 
                        target: targetPosition 
                    }
                }));
            }
        },
    }));

    return (
        <mesh ref={ref}>
            <boxGeometry args={args} />
            <meshStandardMaterial color="cyan" transparent opacity={0.3} visible={true} />
        </mesh>
    );
};