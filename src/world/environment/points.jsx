import React, { useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';

const tempObject = new THREE.Object3D();

const Points = ({ count, positions }) => {
    const meshRef = useRef();

    useLayoutEffect(() => {
        if (!meshRef.current) return;

        positions.forEach((pos, i) => {
            tempObject.position.set(...pos);
            tempObject.updateMatrix();
            meshRef.current.setMatrixAt(i, tempObject.matrix);
        });
        
        meshRef.current.instanceMatrix.needsUpdate = true;
    }, [positions]);

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <sphereGeometry args={[0.12, 32, 32]} />
            <meshStandardMaterial color="white" />
        </instancedMesh>
    );
};

export default Points;