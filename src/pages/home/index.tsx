import TopicPostBubble from '@/pages/home/TopicPostBubble';
import TopicPostButton from '@/pages/home/TopicPostButton';
import React, { useState } from 'react';
import '../post/indexTopicPostContent.css';

const HomePage: any = () => {
  const [update, setUpdate] = useState(false);
  return (
    <div>
      <div className="text-3xl mb-6 font-bold text-red-400 cursor-pointer">
        <div>
          主题广场
          <TopicPostButton setUpdate={setUpdate} />
        </div>
      </div>

      <div className="w-2/5 bg-gray-50 rounded-lg">
        <TopicPostBubble update={update} setUpdate={setUpdate} />
      </div>

      <div
        className="absolute inset-y-20 right-10 w-1/2 min-h-screen"
        id="ScrollStyle"
      ></div>
    </div>
  );
};

export default HomePage;
