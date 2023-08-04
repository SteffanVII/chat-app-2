"use client"

import { useLayoutEffect, useRef, useState } from 'react';
import styles from './tooltip.module.scss';

interface Props {
    time : number,
    text : string,
    position : string,
    gap : number,
    manual? : boolean,
    open? : boolean
}

export default function Tooltip( { time, text, position, gap, manual = false, open = false } : Props ) {

    const [ hover, setHover ] = useState(open);
    const [ targetPosition, setTargetPosition ] = useState({
        left : "0px",
        top : "0px"
    });

    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const parent = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLSpanElement>(null);
 
    function calcPosition() {
        let ret = {
            left : "0px",
            top : "0px"
        }

        if (  parent.current && container.current) {

            let p_x = parent.current.getBoundingClientRect().left;
            let p_y = parent.current.getBoundingClientRect().top;
            let p_w = parent.current.clientWidth;
            let p_h = parent.current.clientHeight;
    
            let w = container.current.clientWidth;
            let h = container.current.clientHeight;
    
            let x = 0;
            let y = 0;

            let v_w = window.innerWidth;
            let v_h = window.innerHeight;
    
            switch (position) {
                case "bottom-left":
                    x = p_x - (w + gap);
                    y = p_y + p_h + gap;
                    break;
                case "bottom-left-in":
                    x = (p_x + p_w) - w;
                    y = p_y + p_h + gap;
                    break;
                case "bottom-center":
                    x = (p_x + (p_w / 2)) - (w / 2);
                    y = p_y + p_h + gap;
                    break;
                case "bottom-right":
                    x = p_x + (p_w + gap);
                    y = p_y + p_h + gap;
                    break;
                case "bottom-right-in":
                    x = p_x;
                    y = p_y + p_h + gap;
                    break;
                case "top-left":
                    x = p_x - (w + gap);
                    y = p_y - (h + gap);
                    break;
                case "top-left-in":
                    x = (p_x + p_w) - w;
                    y = p_y - (h + gap);
                    break;
                case "top-center":
                    x = (p_x + (p_w / 2)) - (w / 2);
                    y = p_y - (h + gap);
                    break;
                case "top-right":
                    x = p_x + (p_w + gap);
                    y = p_y - (h + gap);
                    break;
                case "top-right-in":
                    x = p_x;
                    y = p_y - (h + gap);
                    break;
                case "center-left":
                    x = p_x - (w + gap);
                    y = ( p_y + (p_h / 2) ) - ( h / 2 );
                    break;
                case "center-right":
                    x = p_x + (p_w + gap);
                    y = ( p_y + (p_h / 2) ) - ( h / 2 );
                    break;
                default:
                    x = p_x - (w + gap);
                    y = p_y + p_h + gap;
                    break;
            }

            if ( (x + w + gap) > v_w ) {
                x -= (x + w + gap) - v_w;
            }
            if ( x < 0 ) {
                x = gap;
            }
            if ( (y + h + gap) > v_h ) {
                y -= (y + h + gap) - v_h;
            }
            if ( y < 0 ) {
                y = gap;
            }

            ret = {
                top : `${y}px`,
                left : `${x}px`
            }
        }

        return ret;
    }

    useLayoutEffect(() => {
        if ( manual ) {
            setHover(open);
        }
    }, [open]);

    useLayoutEffect(() => {
        if ( hover ) {
            setTargetPosition(calcPosition());
        }
    }, [hover]);

    return (
        <div className={`${styles['tooltip-component']} ${hover ? styles['tooltip-component--hover'] : ''} `}
            onMouseEnter={() => {
                timer.current = setTimeout( () => {
                    setHover(true);
                    clearTimeout(timer.current);
                }, time )
            }}
            onMouseLeave={() => {
                setHover(false);
                clearTimeout(timer.current);
            }}
            ref={parent}
            style={ manual ? {
                pointerEvents : "none"
            } : {} }
        >
            <span className={`${styles['tooltip-component__text']}`}
                    style={targetPosition}
                    ref={container}
            >
                {text}
            </span>
        </div>
    );
}