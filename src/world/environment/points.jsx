import React, { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'


const Points = (props) => {
    return (
        <mesh {...props}>
            <sphereGeometry args={[20, 16, 16]} />
            <meshStandardMaterial color="white" />
        </mesh>
    )
}

export default Points