const ghost = () => {
        return (
            <mesh>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshStandardMaterial color="red" roughness={0.2} metalness={0.1} />
            </mesh>
        );
}


export default ghost 