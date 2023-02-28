import TopicPostBubble from '@/pages/home/TopicPostBubble';
import TopicPostButton from "@/pages/home/TopicPostButton";
import TopicPostContent from "@/pages/home/afterClick/TopicPostContent";
import React, {useState} from "react";
import "./afterClick/indexTopicPostContent.css"
import ReplyPostButton from "@/pages/home/afterClick/ReplyPostButton";
import ReplyPostBubble from "@/pages/home/afterClick/ReplyPostBubble";

const HomePage: any = () => {
    const [postId, setPostId] = useState(0);
    return (
        <div>
            <div className="text-3xl mb-6 font-bold text-red-400 ">
                {
                    postId === 0 ?
                        <div>
                            主题广场
                            <TopicPostButton/>
                        </div> :
                        <div onClick={() => {
                            setPostId(0)
                        }}>
                            返回主题广场
                        </div>
                }
            </div>
            {
                postId === 0 ?
                    <div className="w-2/5 bg-gray-50 rounded-lg">
                        <TopicPostBubble setPostId={setPostId}/>
                    </div> :
                    <div>
                        <div className="w-2/5 bg-gray-50 rounded-lg">
                            <ReplyPostButton key={postId} postId={postId}/>
                        </div>
                        <div className="w-2/5 min-h-screen">
                            <ReplyPostBubble postId={postId}/>
                        </div>
                    </div>
            }
            <div className="absolute inset-y-20 right-10 w-1/2 min-h-screen" style={{overflow: "scroll"}}
                 id="ScrollStyle">
                {
                    postId === 0 ?
                        <div className="text-3xl">好坏</div> :
                        <TopicPostContent key={postId} postId={postId}/>
                }
            </div>
        </div>
    );
};

export default HomePage;
