import FollowList from "@/pages/follow/FollowList";
import React, {useState} from "react";
import SearchAccount from "@/pages/follow/SearchAccount";
import PrivateChat from "@/pages/follow/PrivateChat";
import {SystemMessage} from "@/components/SystemMessage";

export default () => {
    const [update, setUpdate] = useState(false);
    const [updateChat, setUpdateChat] = useState(false);
    const [relationId, setRelationId] = useState('')
    return (
        <div className="flex justify-between w-full h-screen ml-20 mr-20">
            <div className="w-1/3 ml-20 mr-20">
                <SearchAccount setUpdate={setUpdate}/>
                <FollowList update={update} setUpdate={setUpdate} relationId={relationId} setRelationId={setRelationId} setUpdateChat={setUpdateChat}/>
            </div>
            <div className="w-1/2 ml-20 mr-20">
                {relationId !== '' && <PrivateChat relationId={relationId} update={updateChat} setUpdate={setUpdateChat}/>}
            </div>
            <SystemMessage/>
        </div>
    )
}
