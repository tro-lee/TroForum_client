import ReplyPostButton from "@/pages/post/ReplyPostButton";
import ReplyPostBubble from "@/pages/post/ReplyPostBubble";
import TopicPostContent from "@/pages/post/TopicPostContent";
import React, {useState} from "react";
import {history} from '@umijs/max';
import {useParams} from "@@/exports";

export default () => {
    //整体思路
    //updateR用来button发送后，更新帖子
    //masterUserId和master用来回复
    const params = useParams();
    const [master, setMaster] = useState(params.postId);
    const [masterUserName, setMasterUserName] = useState("主帖");
    const [masterUserId, setMasterUserId] = useState(0);
    const [update, setUpdate] = useState(false);
    return (
        <div>
            <div className="text-3xl mb-6 font-bold text-red-400 cursor-pointer">
                <div onClick={() => {
                    history.push('/home')
                }}>
                    返回主题广场
                </div>
            </div>

            <div className="w-2/5">
                <div className="bg-gray-50 rounded-lg">
                    <ReplyPostButton postId={params.postId} setUpdate={setUpdate}
                                     masterData={[master, masterUserId, masterUserName]}
                                     setMasterData={[setMaster, setMasterUserId, setMasterUserName]}/>
                </div>
                <div className="min-h-screen">
                    <ReplyPostBubble postId={params.postId} update={update} setUpdate={setUpdate}
                                     setMasterData={[setMaster, setMasterUserId, setMasterUserName]}/>
                </div>
            </div>

            <div className="absolute inset-y-20 right-10 w-1/2 min-h-screen" style={{overflow: "scroll"}}
                 id="ScrollStyle">
                <TopicPostContent postId={params.postId}/>
            </div>
        </div>
    )
}
