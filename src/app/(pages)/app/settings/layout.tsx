"use client"

import { useStore } from "@/app/store/store";
import sty from "./layout.module.scss";

import React from "react";

export default function PageSettingsLayout( { children } : { children: React.ReactNode } ) {

    const { dark, setDark } = useStore();
    
    return (
        <>
            <section className={sty["settings-window"]}>
                <h1 className={sty["settings-window__title"]}>Settings</h1>
                <div className={`${sty["dark-mode"]} ${dark ? sty["on"] : ""}`}>
                    <label htmlFor="darkmode">Dark Mode</label>
                    <input type="checkbox" id="darkmode" className={`${sty["dark-mode__input"]}`}
                        onChange={( event ) => {
                            setDark(event.currentTarget.checked);
                        }}
                    />
                    <label htmlFor="darkmode" className={sty["dark-mode__switch"]}>
                        <div className={sty["dark-mode__switch__handle"]}></div>
                    </label>
                </div>
            </section>
            {children}
        </>
    );
}