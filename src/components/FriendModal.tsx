import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AddFriend } from '@/service/relation/relation';

const poems = [
  '千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。',
  '白日依山尽，黄河入海流。欲窮千里目，更上一層樓。',
  '春眠不覺曉，處處聞啼鳥。夜來風雨聲，花落知多少。',
  '山重水复疑无路，柳暗花明又一村。',
  '朝辞白帝彩云间，千里江陵一日还。',
  '人生若只如初见，何事秋风悲画扇。',
];

// @ts-ignore
const FriendModal = ({ friendId, onClose }) => {
  const [poem, setPoem] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await AddFriend(friendId);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRandomPoem = () => {
    const randomIndex = Math.floor(Math.random() * poems.length);
    setPoem(poems[randomIndex]);
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">添加好友</h2>
        <p className="mb-8 text-center">{poem}</p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="friendId" className="mb-2 font-bold">
              好友ID
            </label>
            <input
              id="friendId"
              type="text"
              value={friendId}
              className="px-3 py-2 border rounded-lg"
              disabled
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600"
          >
            添加好友
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 rounded-lg shadow hover:text-gray-800"
          >
            取消
          </button>
        </form>
        <button
          type="button"
          onClick={handleRandomPoem}
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800"
        >
          换一首
        </button>
      </div>
    </div>
  );
};

FriendModal.propTypes = {
  friendId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FriendModal;
