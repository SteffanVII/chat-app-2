"use client"

import { useState } from 'react';
import styles from './chats_searchbar.module.scss';

export default function ChatsSearchbar() {

    const [ focused, setFocused ] = useState<boolean>(false);

    return (
        <>
            <label className={`${styles['chats-search-bar']} ${ focused ? styles['focused'] : "" }`}>

                <input className={styles['chats-search-bar__input']} type="text" placeholder="Chat" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
                <div className={styles['chats-search-bar__icon']}></div>

            </label>
        </>
    );

}