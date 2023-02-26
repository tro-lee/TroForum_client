import TopicPostBubble from '@/pages/topicPostPage/TopicPostBubble';
import PostButton from "@/components/PostButton";
import TopicPostContent from "@/pages/topicPostPage/TopicPostContent";
import {useEffect, useState} from "react";

const HomePage: any = () => {
    const [postId, setPostId] = useState(0)
    useEffect(() => {

    })
    return (
        <div>
            <div className="text-3xl mb-6 font-bold text-red-400 ">
                主题贴
                <PostButton/>
            </div>
            <div className="w-2/5 bg-gray-50 rounded-lg">
                <TopicPostBubble setPostId={setPostId}/>
            </div>

            <div className="absolute inset-y-20 right-10 w-1/2 h-4/5">
                {
                    postId === 0?
                        <div className="text-3xl">欢迎来到TRO的快乐论坛</div>:
                        <TopicPostContent key={postId} postId={postId}/>
                }
            </div>
        </div>
    );
};

export default HomePage;
