'use client';
import React from 'react'
import Link from 'next/link'
import fetch_feature_server from '../pages/api/biomes'
const UserClick = () => {
    return (
        <div>
            <button onClick={fetch_feature_server}> SENDQUERY </button>
        </div>
    )
}

export default UserClick