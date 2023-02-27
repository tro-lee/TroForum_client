import TopicPostBubble from '@/pages/home/TopicPostBubble';
import PostButton from "@/components/PostButton";
import TopicPostContent from "@/pages/home/TopicPostContent";
import {useState} from "react";
import "./indexTopicPostContent.css"

const HomePage: any = () => {
    const [postId, setPostId] = useState(0)
    return (
        <div>
            <div className="text-3xl mb-6 font-bold text-red-400 ">
                {
                    postId === 0 ?
                        <div>
                            主题广场
                            <PostButton/>
                        </div> :
                        <div onClick={() => {
                            setPostId(0)
                        }}>
                            返回主题广场
                        </div>
                }
            </div>
            <div className="w-2/5 bg-gray-50 rounded-lg">
                {
                    postId === 0 ?
                        <TopicPostBubble setPostId={setPostId}/> :
                        <div>1</div>
                }
            </div>

            <div className="absolute inset-y-20 right-10 w-1/2 min-h-screen" style={{overflow: "scroll"}} id="ScrollStyle">
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
