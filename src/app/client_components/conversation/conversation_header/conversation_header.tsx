'use client'

import Image from "next/image";
import styles from './conversation_header.module.scss';
import { useStore } from "@/app/store/store";
import { Ithread } from "@/app/models/chat_model";
import DropdownButtons from "../../dropdown_buttons/dropdown_buttons";

export default function ConversationHeader( { thread } : { thread : Ithread } ) {

    // const { loaded_thread } = useStore();

    return (
        <>
            { thread &&
                <section className={styles['conversation-header']} >
                    <div className={styles['conversation-header__profile']}>
                        <Image
                            alt={`profile picture`}
                            src={`${process.env.URL}data${thread.thread_name.toLowerCase()}.jpg`}
                            width={40}
                            height={40}
                            style={{
                                objectFit : 'cover'
                            }}
                        />
                    </div>
                    <span className={styles['conversation-header__username']}>{thread.thread_name}</span>

                    <DropdownButtons buttons={[
                        { name :"Block", callback : () => {return}, icon : "" }
                    ]} position="center-right" icon="../../../../../public/icons/dot-menu.svg" name="" />
                    {/* <button className={styles['conversation-header__settings-btn']}>
                        <div className={styles['conversation-header__settings-btn__icon']} ></div>
                    </button> */}
                </section>
            }
        </>
    );
}