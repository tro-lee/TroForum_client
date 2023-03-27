import React, { useState } from 'react';
import { friendshipPoems, hatredPoems } from './sentence';
import { message } from 'antd';
import {
  AddFriend,
  AgreeFriendRequest,
  DeleteFriend,
  RefuseFriendRequest,
} from '@/service/relation/relation';

// @ts-ignore
const PersonOrAddFriend = ({ userId, userName, friendType, setFriendType }) => {
  /*
   * 1.通过切换不同的tab来显示不同的页面
   * 2.好友关系有四种状态，-1为没建立，0为申请，1为好友，3为删除,4为被申请好友
   * 3.首先判断好友关系，如果是-1，显示添加好友按钮，点击后切换到添加好友页面，其他类似
   * 4.在这里，-1/3是可以申请好友，0是已经申请好友，1是已经是好友，4是被申请好友
   */

  const [activeTab, setActiveTab] = useState('userInfo');
  const [poem, setPoem] = useState('');

  // 切换到添加好友页面
  const switchToAddFriend = () => {
    setActiveTab('addFriend');
    setPoem(
      friendshipPoems[Math.floor(Math.random() * friendshipPoems.length)],
    );
  };

  // 切换到删除好友页面
  const switchToDeleteFriend = () => {
    setActiveTab('deleteFriend');
    setPoem(hatredPoems[Math.floor(Math.random() * friendshipPoems.length)]);
  };

  // 切换到同意好友页面
  const switchToApproveFriend = () => {
    setActiveTab('approveFriend');
    setPoem(
      friendshipPoems[Math.floor(Math.random() * friendshipPoems.length)],
    );
  };

  // 切换到拒绝好友页面
  const switchToRejectFriend = () => {
    setActiveTab('rejectFriend');
    setPoem(hatredPoems[Math.floor(Math.random() * friendshipPoems.length)]);
  };

  // 切换回个人信息页面
  const switchToUserInfo = () => {
    setActiveTab('userInfo');
  };

  // 提交添加好友表单
  const handleAddFriendSubmit = () => {
    AddFriend(userId).then((res) => {
      if (res) {
        message.success('添加成功');
        setFriendType(0); // 更新好友关系为申请
      } else {
        message.error('添加失败');
      }
    });
  };

  // 删除好友
  const handleDeleteFriendSubmit = () => {
    DeleteFriend(userId).then((res) => {
      if (res) {
        message.success('已删除该好友');
        setFriendType(-1); // 更新好友关系为未建立
      } else {
        message.error('删除好友失败');
      }
    });
  };

  // 同意好友
  const handleApproveFriendSubmit = () => {
    AgreeFriendRequest(userId).then((res) => {
      if (res) {
        message.success('已同意好友请求');
        setFriendType(1); // 更新好友关系为好友
      } else {
        message.error('同意好友请求失败');
      }
    });
  };

  //拒绝好友
  const handleRejectFriendSubmit = () => {
    RefuseFriendRequest(userId).then((res) => {
      if (res) {
        message.success('已拒绝好友请求');
        setFriendType(-1); // 更新好友关系为未建立
      } else {
        message.error('拒绝好友请求失败');
      }
    });
  };

  //不同按钮显示
  let button;
  switch (friendType) {
    case -1: //未建立
      button = (
        <button
          type={'button'}
          onClick={switchToAddFriend}
          className="text-2xl w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 mr-4"
        >
          添加好友
        </button>
      );
      break;
    case 0: //申请
      button = (
        <button
          type={'button'}
          disabled
          className="text-2xl w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 mr-4"
        >
          已向对方申请
        </button>
      );
      break;
    case 1: //已经好友
      button = (
        <>
          <button
            type={'button'}
            onClick={switchToDeleteFriend}
            className="text-2xl w-full px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 mr-4"
          >
            删除好友
          </button>
        </>
      );
      break;
    case 4: //被申请好友
      button = (
        <>
          <button
            type={'button'}
            onClick={switchToApproveFriend}
            className="text-2xl w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-blue-600 mr-4"
          >
            同意好友
          </button>
          <button
            type={'button'}
            onClick={switchToRejectFriend}
            className="text-2xl w-full px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 mr-4"
          >
            拒绝好友
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
      {activeTab === 'addFriend' && (
        <div className="bg-blue-100 p-6 rounded-lg border-2 border-blue-300">
          <h3 className="text-lg font-bold mb-4">添加好友</h3>
          <p className="mb-8 text-center">{poem}</p>
          <form onSubmit={handleAddFriendSubmit}>
            <div className="flex flex-col mb-4">
              <label htmlFor="friendId" className="mb-2 font-bold">
                好友ID
              </label>
              <input
                id="friendId"
                type="text"
                value={userId}
                disabled
                className="px-3 py-2 border-2 border-gray-300 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
            >
              确认添加
            </button>
          </form>
        </div>
      )}
      {activeTab === 'deleteFriend' && (
        <div className="bg-red-100 p-6 rounded-lg border-2 border-red-300">
          <h3 className="text-lg font-bold mb-4">删除好友</h3>
          <p className="mb-8 text-center">{poem}</p>
          <form onSubmit={handleDeleteFriendSubmit}>
            <div className="flex flex-col mb-4">
              <label htmlFor="friendId" className="mb-2 font-bold">
                好友ID
              </label>
              <input
                id="friendId"
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
              确认删除
            </button>
          </form>
        </div>
      )}
      {activeTab === 'approveFriend' && (
        <div className="bg-green-100 p-6 rounded-lg border-2 border-green-300">
          <h3 className="text-lg font-bold mb-4">同意好友申请</h3>
          <p className="mb-8 text-center">{poem}</p>
          <form onSubmit={handleApproveFriendSubmit}>
            <div className="flex flex-col mb-4">
              <label htmlFor="friendId" className="mb-2 font-bold">
                好友ID
              </label>
              <input
                id="friendId"
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
              确认同意
            </button>
          </form>
        </div>
      )}
      {activeTab === 'rejectFriend' && (
        <div className="bg-red-100 p-6 rounded-lg border-2 border-red-300">
          <h3 className="text-lg font-bold mb-4">拒绝好友申请</h3>
          <p className="mb-8 text-center">{poem}</p>
          <form onSubmit={handleRejectFriendSubmit}>
            <div className="flex flex-col mb-4">
              <label htmlFor="friendId" className="mb-2 font-bold">
                好友ID
              </label>
              <input
                id="friendId"
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
              确认拒绝
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PersonOrAddFriend;
