import { create } from "zustand";
import { IchatRow, Ithread } from "../models/chat_model";
import { Isession } from "../models/session";
import { Iuser } from "../models/user_model";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en';

export interface State {
    thread : string,
    list : IchatRow[],
    session : Isession,
    loaded_thread :Ithread | null,
    contacts : Iuser[],
    timeago : TimeAgo,
    dark : boolean
}

export interface Action {
    jumpThread : ( thread_id : State['thread'] ) => void,
    setLoadedThread : ( thread : Ithread)  => void,
    updateList : ( _list : IchatRow[] ) => void,
    updateContacts : ( contacts : Iuser[] ) => void,
    setDark : ( value : boolean ) => void
}

export const useStore = create<State & Action>()( (set) => {

    TimeAgo.addDefaultLocale(en);

    return {
        // State
        thread : "ikfkw",
        list : [],
        session : {
            authenticated : true,
            username : "Josh"
        },
        loaded_thread : null,
        contacts : [],
        timeago : new TimeAgo('en-US'),
        dark : false,

        // Actions
        jumpThread : ( thread_id : string ) => set( () => ({ thread : thread_id }) ),
        setLoadedThread : ( thread : Ithread ) => set( () => ({ loaded_thread : thread }) ),
        updateList : ( _list : IchatRow[] ) => set( () => ({ list : _list }) ),
        updateContacts : ( contacts : Iuser[] ) => set( () => ({ contacts : contacts }) ),
        setDark : ( value : boolean ) => set( () => ({dark : value}) ),
    }
} );