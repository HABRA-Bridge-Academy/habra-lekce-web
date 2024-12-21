'use client';

import React from 'react';
import Image from 'next/image'


const Icon : React.FC = () => {
    return  <Image
            src="/assets/logo.svg"
            alt="HABRA Logo"
            width={14}
            height={14}
        />
}

export default Icon;