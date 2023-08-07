import Image from 'next/image';
import sty from './layout.module.scss';
import Link from 'next/link';
import { useStore } from '@/app/store/store';
import Tooltip from '@/app/client_components/tooltip/tooltip';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ChatApp | Profile',
    description: 'Simple chat app UI',
}

export default function PageProfileLayout( { children } : { children : React.ReactNode } ) {

    const { session, thread } = useStore();

    return (
        <>
            <section className={sty['profile-window']}>
                <h1 className={sty["title"]}>Profile</h1>
                <div className={sty["profile-picker"]}>
                    <div className={sty["profile-picker__profile"]}>
                        <Image
                            alt={`${session.username} profile`}
                            src={`${process.env.URL}data/${session.username.toLowerCase()}.jpg`}
                            fill
                            style={{
                                objectFit : "contain"
                            }}
                        />
                    </div>
                    <div className={sty["profile-picker__picker"]}>

                    </div>
                </div>
                <div className={sty["username"]}>
                    <input className={sty["username__input"]} type="text" defaultValue={session.username} size={session.username.length} />
                    <button className={sty["username__edit"]}>
                        <div className={sty["username__edit__icon"]}></div>
                    </button>
                </div>
                <div className={sty["counters"]}>
                    <Link className={sty["counters__contact-counter"]}
                            href={`/app/contacts/${thread}`}
                    >
                        <div className={sty["counters__contact-counter__icon"]}></div>
                        <span className={sty["counters__contact-counter__count"]}>{16}</span>
                        <Tooltip text='Contacts' gap={10} position='bottom-center' time={300} />
                    </Link>
                    <Link className={sty["counters__contact-request-counter"]}
                            href={`/app/contacts/${thread}`}
                    >
                        <div className={sty["counters__contact-request-counter__icon"]}></div>
                        <span className={sty["counters__contact-request-counter__count"]}>{8}</span>
                        <Tooltip text='Contact Request' gap={10} position='bottom-center' time={300} />
                    </Link>
                    <Link className={sty["counters__new-message-counter"]}
                            href={`/app/chats/${thread}`}
                    >
                        <div className={sty["counters__new-message-counter__icon"]}></div>
                        <span className={sty["counters__new-message-counter__count"]}>{4}</span>
                        <Tooltip text='New Messages' gap={10} position='bottom-center' time={300} />
                    </Link>
                </div>
                <div className={sty["description"]}>
                    <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</span>
                </div>
                <div className={sty['changers']}>
                    <input type="password" placeholder='Old Password' className={`${sty["changers__input"]} ${sty["changers__input--username-old"]}`}/>
                    <input type="password" placeholder='New Password' className={`${sty["changers__input"]} ${sty["changers__input--username-old"]}`}/>
                    <input type="password" placeholder='Confirm New Password' className={`${sty["changers__input"]} ${sty["changers__input--username-old"]}`}/>
                    <button className={sty['changers__apply']}>Change Password</button>
                </div>
            </section>
            {children}
        </>
    );

}