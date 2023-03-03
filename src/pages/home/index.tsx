import TopicPostBubble from '@/pages/home/TopicPostBubble';
import TopicPostButton from "@/pages/home/TopicPostButton";
import React, {useState} from "react";
import "../post/indexTopicPostContent.css"

const HomePage: any = () => {
    const [updateT, setUpdateT] = useState(0);
    return (
        <div>
            <div className="text-3xl mb-6 font-bold text-red-400 ">
                <div>
                    主题广场
                    <TopicPostButton setUpdate={setUpdateT}/>
                </div>
            </div>

            <div className="w-2/5 bg-gray-50 rounded-lg">
                <TopicPostBubble update={updateT} setUpdate={setUpdateT}/>
            </div>

            <div className="absolute inset-y-20 right-10 w-1/2 min-h-screen" id="ScrollStyle">
                <div className="text-3xl">好坏</div>
            </div>
        </div>
    );
};

export default HomePage;
