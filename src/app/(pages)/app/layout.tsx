"use client"

import React from "react";
import styles from "./layout.module.scss";
import NavigationButton from "@/app/client_components/navigation_button/navigation_button";
import { useStore } from "@/app/store/store";
import Image from "next/image";
import Tooltip from "@/app/client_components/tooltip/tooltip";
import Link from "next/link";

export default function PageAppLayout(
    { children } : { children : React.ReactNode }
) {
    const { session, thread } = useStore();


    return (
        <>
            <nav className={styles['main-nav']} >
                <Link href={`/app/profile/${thread}`} className={styles['main-nav__profile']}>
                    <Image
                        alt="Profile picture"
                        src={`http://localhost:8080/${session.username.toLowerCase()}.jpg`}
                        width={46}
                        height={46}
                    />
                    <Tooltip text={"You"} gap={10} position="center-right" time={300} />
                </Link>
                <hr />
                <hr />
                <hr />
                <NavigationButton type="chats" />
                <NavigationButton type="contacts" />
                <NavigationButton type="settings" />
                <NavigationButton type="logout" />
            </nav>
            {children}
        </>

    );
}