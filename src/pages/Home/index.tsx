import TopicPostBubble from '@/components/TopicPostBubble';

const HomePage: any = () => {
  return (
      <div>
        <div className="text-3xl mb-6 font-bold text-red-400">主题贴</div>
        <TopicPostBubble />
          <div className="absolute inset-y-20 right-10 w-2/5 h-1/4 border-gray-900 border-4 text-center text-3xl">施工中</div>
      </div>
  );
};

export default HomePage;
