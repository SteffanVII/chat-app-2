"use client"

import { useRef, useState } from 'react';
import sty from './searchbar_title.module.scss';

interface Props {
    title : string,
    placeholder : string
}

export default function SearchbarTitle( { title, placeholder } : Props ) {

    const input = useRef<HTMLInputElement>(null);

    const [ hover, setHover ] = useState(false);

    function isInputEmpty() : boolean {
        if ( input.current ) {
            return input.current.value !== "" ? false : true;
        }
        return true;
    }

    return (
        <div className={`${sty['searchbar-title']}  ${ hover || !isInputEmpty() ? sty['searchbar-title--hover'] : '' }`}
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
        >
            <span className={`${sty['searchbar-title__title']}`}>{title}</span>
            <div className={sty['searchbar-title__input-wrapper']}>
                <input className={sty['searchbar-title__input-wrapper__input']} type="text" placeholder={placeholder} ref={input} />
                <div className={sty['searchbar-title__input-wrapper__icon']}></div>
            </div>
        </div>
    );
}