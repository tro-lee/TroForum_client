import TopicPostBubble from '@/pages/home/TopicPostBubble';
import TopicPostButton from "@/pages/home/TopicPostButton";
import TopicPostContent from "@/pages/home/afterClick/TopicPostContent";
import React, {useState} from "react";
import "./afterClick/indexTopicPostContent.css"
import ReplyPostButton from "@/pages/home/afterClick/ReplyPostButton";
import ReplyPostBubble from "@/pages/home/afterClick/ReplyPostBubble";
const HomePage: any = () => {
    const [postId, setPostId] = useState(0);
    const [updateT, setUpdateT] = useState(0);
    const [updateR, setUpdateR] = useState(0);
    return (
        <div>
            {
                postId === 0 ?
                        //点击前
                        <div>
                            <div className="text-3xl mb-6 font-bold text-red-400 ">
                                <div>
                                    主题广场
                                    <TopicPostButton setUpdate={setUpdateT}/>
                                </div>
                            </div>

                            <div className="w-2/5 bg-gray-50 rounded-lg">
                                <TopicPostBubble setPostId={setPostId} update={updateT} setUpdate={setUpdateT}/>
                            </div>

                            <div className="absolute inset-y-20 right-10 w-1/2 min-h-screen" id="ScrollStyle">
                                <div className="text-3xl">好坏</div>
                            </div>
                        </div>
                        ://点击后
                        <div>
                            <div className="text-3xl mb-6 font-bold text-red-400 ">
                                <div onClick={() => {
                                    setPostId(0)
                                }}>
                                    返回主题广场
                                </div>
                            </div>

                            <div className="w-2/5">
                                <div className="bg-gray-50 rounded-lg">
                                    <ReplyPostButton postId={postId} setUpdate={setUpdateR}/>
                                </div>
                                <div className="min-h-screen">
                                    <ReplyPostBubble postId={postId} update={updateR} setUpdate={setUpdateR}/>
                                </div>
                            </div>

                            <div className="absolute inset-y-20 right-10 w-1/2 min-h-screen" style={{overflow: "scroll"}}
                                 id="ScrollStyle">
                                <TopicPostContent key={postId} postId={postId}/>
                            </div>
                        </div>

            }
        </div>
    );
};

export default HomePage;
