import React, { useEffect, useState } from 'react';
import { getTopicPostPageByAuthor, TopicPost } from '@/service/post/post';
import { dateDiff } from '@/service/common/time';
import { history } from '@umijs/max';
import { getColorCode } from '@/pages/home/TopicPostShow/TopicPostBubble';
import Loading from '@/components/Loading';

const PersonTopicPost = (props: any) => {
  //获取当前id
  const { userId } = props;
  //加载
  const [loading, setLoading] = useState(true);
  //帖子
  const [listData, setListData] = useState(Array<TopicPost>);
  //页
  const [page, setPage] = useState({
    current: 1,
    size: 5,
    total: 8,
    pageNum: 0,
  });

  //初始获取数据
  useEffect(() => {
    setLoading(true);
    getTopicPostPageByAuthor(1, 5, userId).then((it) => {
      setPage({
        current: it.page,
        size: it.size,
        total: it.total,
        pageNum: it.page_num,
      });
      console.log(page);
      setListData(it.value);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? <Loading /> : <div className="h-8" />}
      {listData.map((item, index) => {
        return (
          <div
            className={`border-t ${getColorCode(
              Number(item.postId.slice(-2)) % 21,
            )} rounded-lg shadow-lg py-4 px-2 m-2`}
            key={index}
            onClick={() => {
              history.push(`/post/${item.postId}`);
            }}
          >
            <div className="flex justify-between items-center">
              <div />
              <div className="text-sm inline-block font-bold">
                {dateDiff(item.createdTime, new Date().getTime())}
              </div>
            </div>
            <div className="top-2 ml-5 text-2xl block text-gray-500 font-bold">
              {item.title}
            </div>
          </div>
        );
      })}
      {Array.from({ length: page.pageNum }, (_, i) => i).map((item, index) => (
        <div
          key={index}
          className={`m-3 w-7 h-7 ${
            page.current === index + 1 ? 'bg-gray-600' : 'bg-gray-300'
          } inline-flex text-2xl cursor-pointer`}
          onClick={() => {
            if (page.current === index + 1) return;
            setLoading(true);
            getTopicPostPageByAuthor(index + 1, 5, userId).then((res) => {
              setLoading(false);
              // @ts-ignore
              setListData(res.value);
              setPage({
                current: res.page,
                size: res.size,
                total: res.total,
                pageNum: res.page_num,
              });
            });
          }}
        />
      ))}
    </div>
  );
};

export default PersonTopicPost;
