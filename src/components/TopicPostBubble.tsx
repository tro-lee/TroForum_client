import { useState } from 'react';
import { useMount } from 'ahooks';
import { GetTopicPostPage } from '@/service/post/post';
import { Card, Skeleton } from 'antd';

const TopicPostBubble = () => {
  //加载
  const [loading, setLoading] = useState(true);
  //帖子
  const [PostBubbles, setPostBubbles] = useState(Array);

  useMount(() => {
    GetTopicPostPage(1, 4).then((it) => {
      const arr = Array();
      it.value.forEach((value) => {
        arr.push(
          <Card hoverable title={value.title} style={{ marginTop: 20 }}></Card>,
        );
      });
      setPostBubbles(arr);
    });
    setLoading(false);
  });

  return loading ? <Skeleton /> : PostBubbles;
};

export default TopicPostBubble;
