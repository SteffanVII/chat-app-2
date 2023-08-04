'use client'

import { useLayoutEffect } from "react";
import { IchatRow, Ithread } from "../models/chat_model";
import { useStore } from "./store";
import { redirect, usePathname } from "next/navigation";
import { Iuser } from "../models/user_model";

export function SetThread( {thread_id} : { thread_id : string } ) {

    const setLoadedThread = useStore( (state) => state.setLoadedThread );

    async function fetchThread() {
        const data_raw = await fetch( `http://localhost:8080/thread_${thread_id}.json`, {
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
        const raw = await fetch( "http://localhost:8080/chats.json", {
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
        const raw = await fetch( "http://localhost:8080/contacts.json", {
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