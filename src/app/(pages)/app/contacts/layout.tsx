import React from "react";
import styles from './layout.module.scss';
import { SetContactsList } from "@/app/store/clientSetters";
import ContactsList from "@/app/client_components/contact_list/contact_list";
import SearchbarTitle from "@/app/client_components/searchbar_title/searchbar_title";

export default function PageContactsLayout( { children } : { children : React.ReactNode } ) {
    return (
        <>
            <SetContactsList/>
            <section className={styles['contacts-window']} >
                <SearchbarTitle title="Contacts" placeholder="Find Contact" />
                <ContactsList/>
            </section>
            {children}
        </>
    );
}