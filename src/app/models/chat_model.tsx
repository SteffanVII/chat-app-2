export interface IchatRow {
    thread_id : string,
    thread_name : string
    recent_msg : Imessage,
    online : boolean,
    block : {
        status : boolean,
        youBlock : boolean
    }
}

export interface Ithread {
    thread_id : string,
    thread_name : string,
    messages : Imessage[],
    online : boolean,
    block : {
        status : boolean,
        youBlock : boolean
    }
}

export interface Imessage {
    username : string,
    message : string,
    createdAt : string | Date
}