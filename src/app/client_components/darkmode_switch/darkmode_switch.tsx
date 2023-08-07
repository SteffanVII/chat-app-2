"use client"

import { useLayoutEffect } from "react";
import sty from "./darkmode_switch.module.scss";
import { useStore } from "@/app/store/store";

export default function DarkModeSwitch() {

    const { dark, setDark } = useStore();

    useLayoutEffect(() => {
        
    }, [dark]);

    return (
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
    );
}