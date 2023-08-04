'use client'

import { useRef } from "react";
import { State, useStore } from "./store";

export function StoreInitializer( data : State ) {

    const initialized = useRef(false);
    
    if ( !initialized.current ) {
        useStore.setState( {
            thread : data.thread,
            list : data.list
        } );
        initialized.current = true;
    }
    return null;
}