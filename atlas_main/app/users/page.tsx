'use client';
import React from 'react'

import MapComponent from '../../pages/api/biomes'
const Userspage = () => {
    
    return (
        <>
            <head>
                <link rel="stylesheet" href="https://js.arcgis.com/4.27/esri/themes/light/main.css"></link>
            </head>
            
                <MapComponent />
            
        </>
    )
}

export default Userspage