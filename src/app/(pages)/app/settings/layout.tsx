import sty from "./layout.module.scss";

import React from "react";
import { Metadata } from "next";
import DarkModeSwitch from "@/app/client_components/darkmode_switch/darkmode_switch";

export const metadata: Metadata = {
    title: 'ChatApp | Settings',
    description: 'Simple chat app UI',
}

export default function PageSettingsLayout( { children } : { children: React.ReactNode } ) {

    return (
        <>
            <section className={sty["settings-window"]}>
                <h1 className={sty["settings-window__title"]}>Settings</h1>
                <DarkModeSwitch/>
            </section>
            {children}
        </>
    );
}