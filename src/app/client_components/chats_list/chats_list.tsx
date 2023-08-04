'use client'

import { useStore } from '@/app/store/store';
import styles from './chats_list.module.scss';
import ChatRow from './chat_row/chat_row';

export default function ChatsList() {

    const [ list ] = useStore( (state) => [ state.list ] );

    return (
        <>
            <div className={`${styles['chats-list']}`} >
                { (list && list.length !== 0) &&
                    list.map( d => <ChatRow _isNew={true} thread_id={ d.thread_id } /> )
                }
            </div>
        </>
    );

}