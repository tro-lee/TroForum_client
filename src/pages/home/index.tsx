import TopicPostBubble from '@/pages/home/TopicPostShow/TopicPostBubble';
import TopicPostButton from '@/pages/home/TopicPostShow/TopicPostButton';
import React, {useState} from 'react';
import '../post/indexTopicPostContent.css';
import {sentence} from '@/components/sentence';
import Chat from '@/pages/home/Chat/Chat';
import NoticeBoard from '@/pages/home/Notices/Notices';
import RecordInfo from "@/components/RecordInfo";
import {SystemMessage} from "@/components/SystemMessage";
import Notice2Board from "@/pages/home/Notices/Notices2";

const HomePage: any = () => {
    const [update, setUpdate] = useState(false);

    return (
        <div className="flex flex-col w-auto h-screen ml-20 mr-20">
            <div className="flex justify-between items-center border-b-2 border-gray-300">
                <div className="font-bold text-xl">
                    {sentence[Math.floor(Math.random() * sentence.length)]}
                </div>
                <div>
                    <TopicPostButton update={update} setUpdate={setUpdate}/>
                </div>
            </div>

            <div className="flex-1 flex">
                <div className="w-3/5 p-4">
                    <TopicPostBubble update={update} setUpdate={setUpdate}/>
                </div>
                <div className="w-1/5"/>
                <div className="w-2/5 mt-4">
                    <NoticeBoard/>
                    <div className="mb-10"/>
                    <Notice2Board/>
                    <div className="mb-10"/>
                    <Chat/>
                </div>
            </div>
            <SystemMessage/>
            <RecordInfo/>
        </div>
    );
};

export default HomePage;
