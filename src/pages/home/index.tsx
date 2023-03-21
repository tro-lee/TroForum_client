import TopicPostBubble from '@/pages/home/TopicPostBubble';
import TopicPostButton from '@/pages/home/TopicPostButton';
import React, {useState} from 'react';
import '../post/indexTopicPostContent.css';
import {sentence} from "@/pages/home/sentence";

const HomePage: any = () => {
    const [update, setUpdate] = useState(false);

    return (
        <div>
            <div>
                <div className="inline text-3xl mb-6 font-bold text-red-400 cursor-pointer">
                    主题广场
                </div>
                <TopicPostButton setUpdate={setUpdate}/>
                <div className="float-right font-bold underline text-xl">{sentence[Math.floor(Math.random() * sentence.length)]}</div>
            </div>

            <div className="w-2/5 bg-gray-50 rounded-lg">
                <TopicPostBubble update={update} setUpdate={setUpdate}/>
            </div>

            <div
                className="absolute inset-y-20 right-10 w-1/2 min-h-screen"
            >

            </div>
        </div>
    );
};

export default HomePage;
