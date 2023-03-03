import ReplyPostButton from "@/pages/post/ReplyPostButton";
import ReplyPostBubble from "@/pages/post/ReplyPostBubble";
import TopicPostContent from "@/pages/post/TopicPostContent";
import React, {useState} from "react";
import {history} from '@umijs/max';
import {useParams} from "@@/exports";

export default () => {
    const params = useParams();
    const [updateR, setUpdateR] = useState(0);
    return (
        <div>
            <div className="text-3xl mb-6 font-bold text-red-400 ">
                <div onClick={() => {
                    history.push('/home')
                }}>
                    返回主题广场
                </div>
            </div>

            <div className="w-2/5">
                <div className="bg-gray-50 rounded-lg">
                    <ReplyPostButton postId={params.postId} setUpdate={setUpdateR}/>
                </div>
                <div className="min-h-screen">
                    <ReplyPostBubble postId={params.postId} update={updateR} setUpdate={setUpdateR}/>
                </div>
            </div>

            <div className="absolute inset-y-20 right-10 w-1/2 min-h-screen" style={{overflow: "scroll"}}
                 id="ScrollStyle">
                <TopicPostContent key={params.postId} postId={params.postId}/>
            </div>
        </div>
    )
}
