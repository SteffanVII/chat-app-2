import styles from './page.module.scss';
import Conversation from "@/app/client_components/conversation/conversation";
import { SetThread } from "@/app/store/clientSetters";

export default async function PageChatThread( { params } : { params : { thread_id : string } } )
{
    return (
        <>
            <SetThread thread_id={params.thread_id} />
            <Conversation/>
        </>
    );
}