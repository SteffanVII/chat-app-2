"use client"

import Image from 'next/image';
import sty from './profile_image.module.scss';

interface Props {
    alt : string,
    url : string,
    online : boolean,
    size : number
}

export default function ProfileImage( { url, online, size, alt } : Props ) {
    return (
        <div className={sty['profile-image']}
            style={{
                width : `${size}px`,
                height : `${size}px`,
            }}
        >
            <div className={sty['profile-image__wrapper']}>
                <Image
                    alt={alt}
                    src={url}
                    width={size}
                    height={size}
                    style={{
                        objectFit : "contain"
                    }}
                />
            </div>
            {
                online &&
                <span className={sty['profile-image__status']}></span>
            }
        </div>
    );
}