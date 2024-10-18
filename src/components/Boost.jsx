import React from 'react'
import { Box } from '@react-three/drei'




const Boost = () => {
    const array=[
        [0,1,0],
        [20,1,0],
        [30,1,0],
        [60,1,0],
    
    
      ]
    
  return (
    
    <>
    {array.map((element, index) => (
      <Box key={index} position={element} castShadow receiveShadow>
        <meshStandardMaterial attach="material" color="orange" />
      </Box>
    ))}
  </>
  )
}

export default Boost
