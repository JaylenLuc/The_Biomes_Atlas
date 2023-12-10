'use client';
import React from 'react'
import dynamic from 'next/dynamic'

const Userspage = () => {
    const EsriMapWithNoSSR = dynamic(() => import('./components/biomes'), {
        ssr: false,
      });
      
      
    return (
        
        <EsriMapWithNoSSR />
        
        
    )
}

export default Userspage