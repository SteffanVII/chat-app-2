'use client'

import { Ithread } from '@/app/models/chat_model';
import styles from './message_input.module.scss';

export default function MessageInput( { thread } : { thread : Ithread } ) {

    return (
        <div className={styles['conversation-message-input']} >
            <div className={styles['conversation-message-input__wrapper']}>
                <textarea placeholder='Type Something ...' rows={1}
                    onKeyDown={( event ) => {
                        if ( event.key === "Enter" ) event.preventDefault();
                        console.log("test");
                        
                        thread.messages.push({
                            username : "Jost",
                            message : "Send message",
                            createdAt : "07-16-2023 18:34"
                        });
                    }}
                ></textarea>
            </div>
            <button className={styles['conversation-message-input__send']}></button>
        </div>
    );

}