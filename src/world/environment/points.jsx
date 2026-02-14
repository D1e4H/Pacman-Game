import React, { forwardRef } from 'react';

const Points = forwardRef(({ count }, ref) => {
    return (
        <instancedMesh ref={ref} args={[null, null, count]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="white" />
        </instancedMesh>
    );
});

export default Points;