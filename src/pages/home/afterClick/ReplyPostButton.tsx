import { useModel } from '@@/exports';
import React, { useState } from 'react';
import { PostInsertReplyPost } from '@/service/post/post';
import { message } from 'antd';

const ReplyPostButton = (props: any) => {
  const { postId } = props;
  const { initialState } = useModel('@@initialState');
  const [content, setContent] = useState('');
  // @ts-ignore
  const avatarLink = `https://api.multiavatar.com/${
    initialState.id + postId
  }.png`;
  // @ts-ignore
  return (
    <div className="min-w-full min-h-50">
      <img src={avatarLink} alt="" className="w-16 h-16 inline" />
      <div className="inline-flex ml-8">
        {/* eslint-disable-next-line react/button-has-type */}
        <button
          className="bg-gray-0 hover:bg-red-300 text-gray-800 font-bold py-2 px-4 rounded-l"
          onClick={() => {
            setContent('');
          }}
        >
          清空
        </button>
        {/* eslint-disable-next-line react/button-has-type */}
        <button
          className="bg-gray-0 hover:bg-red-300 text-gray-800 font-bold py-2 px-4 rounded-r"
          onClick={async () => {
            try {
              // @ts-ignore
              if (!content) {
                message.error('内容残缺');
                return;
              }
              await PostInsertReplyPost(
                // @ts-ignore
                initialState.id,
                content,
                postId,
              ).then(() => {
                setContent('');
                message.success('回复成功~记得刷新一下页面嗷');
              });
            } catch (e) {}
          }}
        >
          发送
        </button>
        <div className="ml-8 inline text-xl text-gray-400">
          {content.length}/500
        </div>
      </div>
      <textarea
        className="w-full bg-transparent pt-4 text-lg outline-none focus:bg-gray-200 focus:text-gray-700"
        placeholder="：元芳，你怎么看"
        // @ts-ignore
        rows="5"
        value={content}
        // @ts-ignore
        maxLength="500"
        onChange={(res) => {
          // @ts-ignore
          setContent(res.target.value);
        }}
      />
    </div>
  );
};

export default ReplyPostButton;
