
const pacmanController = () => {
useEffect(() => {
    const handledown = (e) => {
        keys.current[e.key.toLowerCase()] = true
    }
    const handleup = (e) => {
        keys.current[e.key.toLowerCase()] = false
    }
    window.addEventListener('keydown', handledown)
    window.addEventListener('keyup', handleup)
    return () => {
        window.removeEventListener('keydown', handledown)
        window.removeEventListener('keyup', handleup)
    }


}, [])



    useFrame((state, delta) => {
        if (!meshRef.current) {
            return
        }
        const speed = 6 * delta
        if (keys.current['w'] || keys.current['arrowup']) {
            meshRef.current.position.y += speed
        }
        if (keys.current['s'] || keys.current['arrowdown']) {
            meshRef.current.position.y -= speed
        }
        if (keys.current['a'] || keys.current['arrowleft']) {
            meshRef.current.position.x -= speed
        }
        if (keys.current['d'] || keys.current['arrowright']) {
            meshRef.current.position.x += speed
        }
    })
}

export { pacmanController }