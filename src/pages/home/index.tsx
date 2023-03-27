import TopicPostBubble from '@/pages/home/TopicPostShow/TopicPostBubble';
import TopicPostButton from '@/pages/home/TopicPostShow/TopicPostButton';
import React, { useState } from 'react';
import '../post/indexTopicPostContent.css';
import { sentence } from '@/pages/home/sentence';
import Chat from '@/pages/home/Chat/Chat';
import NoticeBoard from '@/pages/home/Notices/Notices';

const HomePage: any = () => {
  const [update, setUpdate] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center border-b-2 border-gray-300">
        <div className="font-bold text-xl">
          {sentence[Math.floor(Math.random() * sentence.length)]}
        </div>
        <div>
          <TopicPostButton update={update} setUpdate={setUpdate} />
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="w-3/5 p-4">
          <TopicPostBubble update={update} setUpdate={setUpdate} />
        </div>
        <div className="w-1/5" />
        <div className="w-2/5 mt-4">
          <NoticeBoard />
          <div className="mb-10" />
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
