"use client"

import { useStore } from '@/app/store/store';
import sty from './contact_list.module.scss';
import ContactRow from './contact_row/contact_row';

export default function ContactsList() {

    const [ contacts ] = useStore( state => [
        state.contacts
    ] );

    return (
        <div className={sty['contacts-list']}>
            {
                contacts.map( d => <ContactRow data={d} /> )
            }
        </div>
    );
}