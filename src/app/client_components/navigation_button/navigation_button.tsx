'use client'

import Link from "next/link";
import styles from "./navigation_button.module.scss";
import { usePathname } from 'next/navigation';
import Tooltip from "../tooltip/tooltip";
import useThreadId from "@/app/hooks/useThreadId";

interface Props {
    type : string,
}

export default function NavigationButton( { type } : Props ) {

    const path = usePathname();
    const thread_id = useThreadId();

    return (
        <Link href={`/app/${type}/${thread_id}`} className={`${styles['nav-btn']} ${styles[`nav-btn--${type}`]} ${ path.includes(type) ? styles['active'] : '' }`}>
            <div className={styles[`nav-btn--${type}__icon`]} ></div>
            <Tooltip time={200} text={type} position="center-right" gap={6}/>
        </Link>
    );
}