'use client'

import { useStore } from '@/app/store/store';
import styles from './conversation_messages.module.scss'
import MessageRow from '../message_row/message_row';
import { Imessage, Ithread } from '@/app/models/chat_model';
import { useState } from 'react';

export default function ConversationMessages( { thread } : { thread : Ithread } ) {

    const [ messages, setMessages ] = useState<Imessage[]>(thread.messages);

    return (
        <section className={styles['conversation-messages']} >
            {   
                thread && messages.map( m => <MessageRow data={m}/> )
            }
        </section>
    );
}