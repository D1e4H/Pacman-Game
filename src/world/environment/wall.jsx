import React, { forwardRef } from 'react';

const Wall = forwardRef(({ count }, ref) => {
    return (
        <instancedMesh ref={ref} args={[null, null, count]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="blue" />
        </instancedMesh>
    );
});

export default Wall;