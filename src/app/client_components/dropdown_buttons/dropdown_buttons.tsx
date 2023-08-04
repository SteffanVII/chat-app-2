 "use client"

import { useLayoutEffect, useRef, useState } from 'react';
import styles from './dropdown_buttons.module.scss';
import Image from 'next/image';
import Tooltip from '../tooltip/tooltip';

interface Props {
    buttons : {
        name : string,
        callback : Function,
        icon : string
    }[],
    position : string,
    size : number,
    gap : number,
    name : string
}

export default function DropdownButtons( { buttons, position, gap, size } : Props ) {

    const [ open, setOpen ] = useState(false);
    const container = useRef<HTMLDivElement>(null);
    const button = useRef<HTMLButtonElement>(null);
    const parent = useRef<HTMLDivElement>(null);

    const [ containerPosition, setContainerPosition ] = useState<{left:string,top:string}>({ left : `0px`, top : `0px` });

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
        document.addEventListener("click", ( event ) => {
            let target = event.target as HTMLElement
            if ( target != button.current  ) {
                setOpen(false);
            }
        })
    }, []);

    useLayoutEffect(() => {
        if ( open ) {
            setContainerPosition(calcPosition());
        }
    }, [open]);

    return (
        <div ref={parent} className={ `${styles['dropwdown-buttons']}` }
            style={{
                width : `${size}px`,
                height : `${size}px`
            }}
        >
            <button ref={button} className={styles['dropwdown-buttons__main']}
                onClick={() => {
                    setOpen(!open);
                }}
            >
                <span className={styles['dropwdown-buttons__main__icon']}></span>
            </button>
            <div ref={container} className={`${styles['dropwdown-buttons__container']} ${ open ? styles[`dropwdown-buttons__container--open`] : '' }`}
                style={containerPosition}
            >
                <div className={styles['dropwdown-buttons__container--open__wrapper']}>
                    {
                        buttons && buttons.map( d => {
                            return (
                                <button className={styles['dropwdown-buttons__container--open__wrapper__button']}
                                        onClick={ () => d.callback() }
                                        key={`${d.name}`}
                                >
                                    {d.name}
                                    <Image
                                        alt={d.name}
                                        src={d.icon}
                                        width={22}
                                        height={22}
                                    />
                                </button>
                            )
                        } )
                    }
                </div>
            </div>
        </div>
    );

}