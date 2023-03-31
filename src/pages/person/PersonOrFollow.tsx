import React, { useState } from 'react';
import { followershipPoems, hatredPoems } from '@/components/sentence';
import { message } from 'antd';
import {deleteFollower, follow} from "@/service/relation/relation";

// @ts-ignore
const PersonOrFollow = ({ userId, userName, type, setType }) => {
  /*
   * 1.通过切换不同的tab来显示不同的页面
   * 2.0表示未关注,1表示关注
   */

  const [activeTab, setActiveTab] = useState('userInfo');
  const [poem, setPoem] = useState('');

  // 切换到关注页面
  const switchToAddFollow = () => {
    setActiveTab('addFollow');
    setPoem(
      followershipPoems[Math.floor(Math.random() * followershipPoems.length)],
    );
  };

  // 切换到取消关注页面
  const switchToDeleteFollow = () => {
    setActiveTab('deleteFollow');
    setPoem(hatredPoems[Math.floor(Math.random() * followershipPoems.length)]);
  };

  // 切换回个人信息页面
  const switchToUserInfo = () => {
    setActiveTab('userInfo');
  };

  // 关注
  const handleAddFollowSubmit = () => {
    follow(userId).then((res) => {
      if (res) {
        message.success('关注成功');
        setType(1); // 更新好友关系为申请
      } else {
        message.error('关注失败');
      }
    });
  };

  // 取关
  const handleDeleteFollowSubmit = () => {
    deleteFollower(userId).then((res) => {
      if (res) {
        message.success('已取关');
        setType(0);
      } else {
        message.error('取关失败');
      }
    });
  };

  //不同按钮显示
  let button;
  switch (type) {
    case 0: //关注
      button = (
        <button
          type={'button'}
          onClick={switchToAddFollow}
          className="text-2xl w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 mr-4"
        >
          关注
        </button>
      );
      break;
    case 1: //取关
      button = (
        <>
          <button
            type={'button'}
            onClick={switchToDeleteFollow}
            className="text-2xl w-full px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-gray-600 mr-4"
          >
            取关
          </button>
        </>
      );
      break;
    default:
      button = null;
  }

  return (
    <div className="p-8 mt-8 bg-white rounded-lg shadow-lg border-2 border-gray-300">
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-2xl font-bold">{userName}</h2>
      </div>
      {activeTab === 'userInfo' && <div>{button}</div>}
      {activeTab !== 'userInfo' && (
        <div className="mb-6">
          <button
            type={'button'}
            onClick={switchToUserInfo}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 mr-4"
          >
            返回个人信息
          </button>
        </div>
      )}
      {activeTab === 'addFollow' && (
        <div className="bg-green-100 p-6 rounded-lg border-2 border-green-300">
          <h3 className="text-lg font-bold mb-4">关注</h3>
          <p className="mb-8 text-center">{poem}</p>
          <form onSubmit={handleAddFollowSubmit}>
            <div className="flex flex-col mb-4">
              <label htmlFor="followerId" className="mb-2 font-bold">
                用户ID
              </label>
              <input
                id="followerId"
                type="text"
                value={userId}
                disabled
                className="px-3 py-2 border-2 border-gray-300 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
            >
              关注
            </button>
          </form>
        </div>
      )}
      {activeTab === 'deleteFollow' && (
        <div className="bg-red-100 p-6 rounded-lg border-2 border-red-300">
          <h3 className="text-lg font-bold mb-4">取关</h3>
          <p className="mb-8 text-center">{poem}</p>
          <form onSubmit={handleDeleteFollowSubmit}>
            <div className="flex flex-col mb-4">
              <label htmlFor="followerId" className="mb-2 font-bold">
                用户ID
              </label>
              <input
                id="followerId"
                type="text"
                value={userId}
                disabled
                className="px-3 py-2 border-2 border-gray-300 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
            >
              取关
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PersonOrFollow;
