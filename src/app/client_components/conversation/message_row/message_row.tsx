'use client'

import { Imessage } from "@/app/models/chat_model";
import styles from "./message_row.module.scss";
import Image from "next/image";
import { useStore } from "@/app/store/store";
import { useState } from "react";
import DropdownButtons from "../../dropdown_buttons/dropdown_buttons";
import Tooltip from "../../tooltip/tooltip";

interface Props {
    data : Imessage,
    no_profile : boolean
}

export default function MessageRow( { data, no_profile } : Props ) {

    const { session } = useStore();
    const [ isYou, setIsYou ] = useState( data.username === session.username );
    const [ options, setOptions ] = useState(false);
    const [ showTime, setShowTime ] = useState(false);

    return (
        <div className={`${styles['message-row']} ${ isYou ? styles['message-row--you'] : '' }`}
            onMouseEnter={() => setOptions(true)}
            onMouseLeave={() => setOptions(false)}
        >
            <figure className={styles['message-row__profile']} >
                {   !no_profile && 
                    <Image
                        alt={`${data.username} profile picture`}
                        src={`${process.env.URL}data/${data.username.toLowerCase()}.jpg`}
                        width={24}
                        height={24}
                        style={{
                            objectFit : 'cover'
                        }}
                    />
                }
            </figure>
            <div className={`${styles['message-row__message']}`}>
                {
                    ( options && isYou ) &&
                    <DropdownButtons buttons={[
                            { name : "Delete", icon : '/icons/trash.svg', callback : () => {} },
                        ]}
                        position="center-left"
                        name="Message Option"
                        gap={14}
                        size={32}
                    />
                }
                <div className={styles['message-row__message__text']} >
                    <span className={styles['message-row__message__text__span']} role="textbox"
                            onMouseEnter={() => setShowTime(true)}
                            onMouseLeave={() => setShowTime(false)}
                    >{data.message}</span>
                    <Tooltip time={1000} text={new Date(data.createdAt).toLocaleDateString()} gap={10} position={ isYou ? "center-left" : "center-right"} manual={true} open={showTime}  />
                </div>

            </div>
            {/* <span className={styles['message-row__message__timestamp']}>
                <ReactTimeAgo locale="en-US" date={new Date(data.createdAt)} styles={"twitter-minute-now"} />
            </span> */}
            {/* <div className={styles['message-row__options']}>
            </div> */}
        </div>
    );
}