import React from 'react';
import styles from './layout.module.scss';
import ChatsSearchbar from '@/app/client_components/chats_searchbar/chats_searchbar';
import ChatsList from '@/app/client_components/chats_list/chats_list';
import { SetChatWindowList } from '@/app/store/clientSetters';
import SearchbarTitle from '@/app/client_components/searchbar_title/searchbar_title';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ChatApp | Chats',
    description: 'Simple chat app UI',
}

export default function PageChatsLayout(
    { children} : { children : React.ReactNode }
) {

    return (
        <>
            <SetChatWindowList/>
            <section className={styles['chats-window']} >
                <SearchbarTitle title='Chats' placeholder='Search Chat' />
                <ChatsList/>
            </section>
            {children}
        </>
    );
}