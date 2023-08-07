'use client'

import styles from './conversation.module.scss'
import { Imessage } from '@/app/models/chat_model';
import {  useEffect, useLayoutEffect, useRef, useState } from 'react';
import MessageRow from './message_row/message_row';
import { useStore } from '@/app/store/store';
import DropdownButtons from '../dropdown_buttons/dropdown_buttons';
import { shallow } from "zustand/shallow";
import ButtonIcon from '../button_icon/button_icon';
import React from 'react';
import ProfileImage from '../profile_image/profile_image';
import Image from 'next/image';

export default function Conversation(  ) {

    const [ loaded_thread, list, updateList, setLoadedThread, timeago ] = useStore( (state) => [
        state.loaded_thread,
        state.list,
        state.updateList,
        state.setLoadedThread,
        state.timeago
    ], shallow);

    const message_container = useRef<HTMLDivElement>(null);
    const input = useRef<HTMLTextAreaElement>(null);
    const duplicate = useRef<HTMLSpanElement>(null);

    const [ backread, setBackread ] = useState(false);
    const [ rows, setRows ] = useState<JSX.Element[]>([]);

    const scroll_timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    function sendMessage() {
        if ( input.current && input.current.value && !loaded_thread?.block.status ) {
            let value = input.current.value.trim();
            if ( value === "" ) return;
            else {
                if ( loaded_thread ) {
                    let message = {
                        username : "Josh",
                        message : value,
                        createdAt : new Date()
                    }
                    loaded_thread.messages.push(message);
                    input.current.value = "";
                    duplicate.current!.textContent = "";
    
                    setLoadedThread({...loaded_thread});
                    updateClientList( loaded_thread.messages[loaded_thread.messages.length - 1] )
                }
            }
        }
    }

    function updateClientList( message : Imessage ) {
        if ( loaded_thread ) {
            list.forEach( d => {
                if ( d.thread_name === loaded_thread.thread_name ) {
                    d.recent_msg = message;
                    return;
                }
            } );
            updateList(list);
        }
    }

    // Random number generator for keys
    function randomNum() {
        let n = Math.random() * 100;
        return n;
    }

    // Create an array of message and timestamp elements
    function renderMessages() {

        let time : Date;
        let elements : JSX.Element[] = [];

        function changeTimeFormat() {
         
            let hours = time.getHours();
            let minutes : string | number = time.getMinutes();
         
            // Check whether AM or PM
            let newformat = hours >= 12 ? 'PM' : 'AM';
         
            // Find current hour in AM-PM Format
            hours = hours % 12;
         
            // To display "0" as "12"
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
         
            return hours + ':' + minutes + ' ' + newformat;
        }

        function generateTimeString() {
            let diff_now = Math.round(Date.now() / 1000) - Math.round(time.getTime() / 1000);
            let str = diff_now >= 86400 ? `${time.toDateString()} ${changeTimeFormat()}` : changeTimeFormat();

            return str;
        }

        if ( loaded_thread ) {
            
            loaded_thread.messages.forEach( (element, i) => {

                let eT = new Date( element.createdAt );
                
                // Initialize first timestamp
                if ( !time ) {
                    time = eT
                    elements.push( <span className={styles['conversation-section__messages__container__timestamp']} key={time.getTime() / 1000}>{generateTimeString()}</span> );
                }

                if ( time ) {
                    
                    //previous and current message time difference
                    let diff = Math.round(eT.getTime() / 1000) - Math.round(time.getTime() / 1000);
                    
                    // Create new timestamp if there is 1 hour time difference
                    if ( diff > 60 * 2 ) {
                        time = eT
                        elements.push( <span className={styles['conversation-section__messages__container__timestamp']} key={time.getTime() / 1000}>{generateTimeString()}</span> );
                    }
                }

                // Create new message row
                elements.push(<MessageRow data={element} no_profile={(loaded_thread.messages[i + 1] ? loaded_thread.messages[i + 1].username === element.username ? true : false : false)} key={`m-row-${randomNum()}`} />)

            });

        }

        // Update row state
        setRows(elements);
    }

    useLayoutEffect(() => {
        renderMessages();
    }, [loaded_thread]);

    useEffect(() => {

        // Scroll to bottom whenever new message is inserted if backread is false
        if ( !backread ) {
            if ( message_container.current ) {
                message_container.current.scrollTop = message_container.current.scrollHeight;
            }
        }

    }, [rows]);

    return (
        <section className={styles['conversation-section']} >

            {
                loaded_thread &&
                <>
                    {/* Header */}
                    <div className={styles['conversation-section__header']} >
                        <ProfileImage
                            alt={`profile picture`}
                            url={`${process.env.URL}data/${loaded_thread.thread_name.toLowerCase()}.jpg`}
                            size={40}
                            online={loaded_thread.online}
                        />
                        <span className={styles['conversation-section__header__username']}>{loaded_thread.thread_name}</span>
                        <ButtonIcon name='Video Call' icon_url='../../../../icons/video_call.svg' />
                        <ButtonIcon name='Voice Call' icon_url='../../../../icons/call.svg' />
                        <DropdownButtons buttons={[
                                    { name :"Block", callback : () => {return}, icon : "/icons/block.svg" },
                                    { name :"Archive", callback : () => {return}, icon : "/icons/message.svg" },
                                ]}
                                position="bottom-left-in"
                                name=""
                                gap={10}
                                size={30}
                            />
                    </div>
                    
                    {/* Messages */}
                    <div className={styles['conversation-section__messages']}>
                        <div className={styles['conversation-section__messages__container']} ref={message_container}
                                onScroll={(event) => {
                                    if ( scroll_timer.current ) {
                                        clearTimeout(scroll_timer.current);
                                    }

                                    scroll_timer.current = setTimeout(() => {
                                        if ( message_container.current ) {
                                            let max_scroll = (message_container.current.scrollHeight - message_container.current.clientHeight) - 10;
                                            let curr_scroll = Math.ceil(message_container.current.scrollTop);
    
                                            // console.log(`max scroll - ${max_scroll}`);
                                            // console.log(`current scroll - ${Math.ceil(message_container.current.scrollTop)}`);
                                            
                                            if ( curr_scroll >= max_scroll ) {
                                                // console.log(false);
                                                setBackread(false);
                                            } else {
                                                // console.log(true);
                                                setBackread(true);
                                            }
                                        }
                                    }, 100);
                                }}
                        >
                            <div className={styles['conversation-section__messages__container__spacer']} ></div>
                            {rows}
                            {
                                loaded_thread.block.status &&
                                <div className={styles['conversation-section__messages__container__block-message']}>
                                    <div className={styles['conversation-section__messages__container__block-message__wrapper']}>
                                        <div className={styles['conversation-section__messages__container__block-message__wrapper__block-profile']}>
                                            <Image
                                                alt={`${loaded_thread.thread_name} profile picture`}
                                                src={`${process.env.URL}data/${loaded_thread.thread_name.toLowerCase()}.jpg`}
                                                width={80}
                                                height={80}
                                                style={{
                                                    objectFit : "contain"
                                                }}
                                            />
                                        </div>
                                        <div className={styles['conversation-section__messages__container__block-message__wrapper__icon']}></div>
                                        {
                                            loaded_thread.block.youBlock ?
                                            <span>You blocked {loaded_thread.thread_name}.</span>
                                            :
                                            <span>{loaded_thread.thread_name} blocked you.</span>
                                        }
                                        <p>Recieving and Sending message to this user is disabled</p>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={`${styles['conversation-section__messages__alerts']} ${backread ? styles['conversation-section__messages__alerts--active'] : ''}`}>
                            <button className={styles['conversation-section__messages__alerts__bottom']}
                                    onClick={() => {
                                        if ( message_container.current ) {
                                            message_container.current.scrollTop = message_container.current.scrollHeight;
                                        }
                                    }}
                            >
                                <div className={styles['conversation-section__messages__alerts__bottom__icon']}></div>
                            </button>
                        </div>
                    </div>

                    {/* Input */}
                    <div className={styles['conversation-section__input']} >
                        <div className={styles['conversation-section__input__wrapper']} >
                            <textarea placeholder='Type Message ...' rows={1} ref={input} disabled={loaded_thread.block.status}
                                onKeyDown={( event ) => {
                                    if ( event.key === "Enter" ) {
                                        if ( !event.shiftKey ) {
                                            event.preventDefault();
                                            sendMessage();
                                        }
                                    };
                                    
                                }}
                                onChange={( event ) => {
                                    if ( duplicate.current ) {
                                        duplicate.current.textContent = event.currentTarget.value;
                                    }
                                }}
                            ></textarea>
                            <span className={styles['conversation-section__input__wrapper__duplicate']} ref={duplicate}></span>
                        </div>
                        <button className={styles['conversation-section__input__send']} disabled={loaded_thread.block.status}
                                onClick={() => {
                                    sendMessage();
                                }}
                        ></button>
                    </div>

                    <div className={styles['conversation-section__sim']} >
                        <button
                            onClick={() => {
                                let message = {
                                    username : loaded_thread.thread_name,
                                    message : "Dummy message",
                                    createdAt : new Date()
                                }
                                loaded_thread.messages.push(message);
                                setLoadedThread({...loaded_thread});
                                updateClientList(message);
                            }}
                        >Simulate message from {loaded_thread.thread_name}</button>
                    </div>
                </>
            }


        </section>
    );

}