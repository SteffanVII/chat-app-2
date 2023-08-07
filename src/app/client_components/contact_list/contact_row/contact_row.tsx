"use client"

import { Iuser } from '@/app/models/user_model';
import sty from './contact_row.module.scss';
import DropdownButtons from '../../dropdown_buttons/dropdown_buttons';
import Image from 'next/image';
import ProfileImage from '../../profile_image/profile_image';

interface Props {
    data : Iuser
}

export default function ContactRow( { data } : Props ) {

    return (
        <div className={sty['contact-row']} >
            <ProfileImage
                alt={data.username}
                url={`${process.env.URL}data/${data.username.toLowerCase()}.jpg`}
                size={40}
                online
            />
            <span className={sty['contact-row__username']}>
                {data.username}
            </span>
            <DropdownButtons
                buttons={[
                    { name : 'Message', icon: '/icons/message.svg', callback : () => {} },
                    { name : 'Block', icon: '/icons/block.svg', callback : () => {} }
                ]}
                name='Contact Options'
                size={30}
                gap={14}
                position='center-left'
            />
        </div>
    );

}