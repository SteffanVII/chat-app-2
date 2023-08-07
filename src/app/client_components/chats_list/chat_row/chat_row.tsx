'use client'

import { useState } from 'react';
import styles from './chat_row.module.scss';
import { useStore } from '@/app/store/store';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import ReactTimeAgo from 'react-time-ago';
import useThreadId from '@/app/hooks/useThreadId';
import Tooltip from '../../tooltip/tooltip';
import ProfileImage from '../../profile_image/profile_image';

type Props = {
    _isNew : boolean,
    thread_id : string
}

export default function ChatRow( { _isNew, thread_id } : Props ) {

    const { thread, list, session, jumpThread, timeago } = useStore();
    const [ isNew, setIsNew ] = useState<boolean>(_isNew);
    const [ data, setData ] = useState(list.find( d => { return d.thread_id === thread_id } )!);
    const router = useRouter();
    const threadId = useThreadId();

    return (
        //                                     #If state thread is equal to thread_id = active
        <div className={`${styles['chat-row']} ${threadId === data.thread_id ? styles['chat-row--active'] : ''} ${isNew ? styles['chat-row--new'] : ''}`}
            onClick={() => {
                if ( isNew ) setIsNew(false);
                // Client side state
                jumpThread(data.thread_id);
                router.push(`/app/chats/${data.thread_id}`);
            }}
        >
            <ProfileImage
                alt={`${data.recent_msg.username} profile picture`}
                url={`${process.env.URL}data/${data.thread_name.toLowerCase()}.jpg`}
                size={40}
                online={data.online}
            />
            <div className={`${styles['chat-row__details']}`} >
                <span className={`${styles['chat-row__details__username']}`} >{data.thread_name}</span>
                <span className={`${styles['chat-row__details__recent-msg']}`} >{ data.recent_msg.username === session.username ? "You" : data.recent_msg.username } : {data.recent_msg.message}</span>
            </div>
            <div className={`${styles['chat-row__status']}`}>
                { isNew && <span className={styles['chat-row__status__new']} ></span> }
                <span className={`${styles['chat-row__status__time']}`} >{ timeago.format(new Date(data.recent_msg.createdAt))}</span>
            </div>
            <Tooltip text={data.thread_name} time={1000} gap={10} position='center-right'/>
        </div>
    );
}