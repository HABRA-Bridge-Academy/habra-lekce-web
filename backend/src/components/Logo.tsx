'use client';

import React from 'react';
import Image from 'next/image'

const Logo : React.FC = () => {
    return (
        <Image
            src="/assets/logo-xl.svg"
            alt="HABRA Logo"
            width={0} height={0}
            style={{ width: '200px', height: "auto" }}
        />
    );
}

export default Logo;