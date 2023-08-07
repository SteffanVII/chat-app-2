import { StoreInitializer } from "@/app/store/initializer";
import { redirect } from "next/navigation";

export default function PageApp() {

    redirect("app/chats");

    return (
        <>
            {/* <StoreInitializer
                thread={"ikfkw"}
                list={[]}
                session={{
                    authenticated : true,
                    username : "Josh"
                }}
                loaded_thread={null}
                contacts={[]}
            /> */}
        </>
    );
}