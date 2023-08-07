'use client'

import { useEffect, useLayoutEffect } from "react";
import { IchatRow, Ithread } from "../models/chat_model";
import { useStore } from "./store";
import { redirect, usePathname } from "next/navigation";
import { Iuser } from "../models/user_model";
import ITheme from "../models/theme";

export function SetThread( {thread_id} : { thread_id : string } ) {

    const setLoadedThread = useStore( (state) => state.setLoadedThread );

    async function fetchThread() {
        const data_raw = await fetch( `${process.env.URL}data/thread_${thread_id}.json`, {
            cache : 'no-cache'
        } );
        
        const data = (await data_raw.json()) as Ithread;
        data.messages = data.messages.map( d => {
                d.createdAt = new Date(d.createdAt);
                return d;
        } );

        return data;
    }

    useLayoutEffect(() => {
        fetchThread().then( d => {
            setLoadedThread(d);
        } )
    }, []);

    return null;
}

export function SetChatWindowList() {

    const path = usePathname();

    if ( path === "/app/chats" && useStore.getState().thread !== "" ) {
        redirect( `/app/chats/${useStore.getState().thread}` );
    }

    const [ list, updateList ] = useStore( (state) => [
        state.list,
        state.updateList
    ] );

    async function getList() {
        const raw = await fetch( `${process.env.URL}data/chats.json`, {
            cache : 'no-cache'
        } );
        const data = (await raw.json()) as {
            data : IchatRow[]
        };
        return data;
    }

    useLayoutEffect( () => {
        getList().then( ( val ) => {
            updateList(val.data);
        } )
    }, []);

    return null;
}

export function SetContactsList() {

    const [ updateContacts ] = useStore( state => [
        state.updateContacts
    ] );

    async function getList() {
        const raw = await fetch( `${process.env.URL}data/contacts.json`, {
            cache : 'no-cache'
        } );
        const data = (await raw.json()) as {
            results : Iuser[]
        }
        console.log(data);
        
        return data;
    }

    useLayoutEffect(() => {
        getList().then( val => {
            updateContacts(val.results);
        } )
    }, []);

    return null;
}

export function SetTheme() {

    const { theme, dark } = useStore();

    async function getTheme() {
        const raw = await fetch( `${process.env.URL}themes/${theme}${ dark ? "_dark" : "" }.json`, {
            cache : "no-cache"
        } );
        const data = (await raw.json()) as ITheme;
        console.log(data);
        
        return data;
    }

    useEffect( () => {
        getTheme().then( d => {
            document.documentElement.style.setProperty("--background-color", d["--background-color"]);
            document.documentElement.style.setProperty("--default-font-color", `${d["--default-font-color"]}`);
            document.documentElement.style.setProperty("--default-border-color", `${d["--default-border-color"]}`);
            document.documentElement.style.setProperty("--default-outline-color", d["--default-outline-color"]);
            document.documentElement.style.setProperty("--default-btn-background-color", d["--default-btn-background-color"]);
            document.documentElement.style.setProperty("--default-btn-background-color-hover", d["--default-btn-background-color-hover"]);
            document.documentElement.style.setProperty("--default-btn-background-color-active", d["--default-btn-background-color-active"]);
            document.documentElement.style.setProperty("--default-btn-icon-color", d["--default-btn-icon-color"]);
            document.documentElement.style.setProperty("--default-btn-icon-color-hover", d["--default-btn-icon-color-hover"]);
            document.documentElement.style.setProperty("--default-btn-background-color-hover-1", d["--default-btn-background-color-hover-1"]);
            document.documentElement.style.setProperty("--default-btn-background-color-active-1", d["--default-btn-background-color-active-1"]);
            document.documentElement.style.setProperty("--default-btn-icon-color-1", d["--default-btn-icon-color-1"]);
            document.documentElement.style.setProperty("--default-btn-icon-color-hover-1", d["--default-btn-icon-color-hover-1"]);
            document.documentElement.style.setProperty("--primary-color-1", d["--primary-color-1"]);
            document.documentElement.style.setProperty("--primary-color-2", d["--primary-color-2"]);
            document.documentElement.style.setProperty("--chat-row-active", d["--chat-row-active"]);
            document.documentElement.style.setProperty("--chat-row-inactive", d["--chat-row-inactive"]);
            document.documentElement.style.setProperty("--chat-row-hover", d["--chat-row-hover"]);
            document.documentElement.style.setProperty("--chat-row-border", d["--chat-row-border"]);
            document.documentElement.style.setProperty("--contact-row-background", d["--contact-row-background"]);
            document.documentElement.style.setProperty("--contact-row-background-hover", d["--contact-row-background-hover"]);
            document.documentElement.style.setProperty("--contact-row-font-color-hover", d["--contact-row-font-color-hover"]);
            document.documentElement.style.setProperty("--message-float-background-color", d["--message-float-background-color"]);
            document.documentElement.style.setProperty("--message-float-color", d["--message-float-color"]);
            document.documentElement.style.setProperty("--message-float-color-you", d["--message-float-color-you"]);
            document.documentElement.style.setProperty("--dropdown-main-icon-color", d["--dropdown-main-icon-color"]);
            document.documentElement.style.setProperty("--dropdown-font-color", d["--dropdown-font-color"]);
        })
    }, [theme, dark]);

    return null;
}