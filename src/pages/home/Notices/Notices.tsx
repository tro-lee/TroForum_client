import React from 'react';

const NoticeBoard = () => {
  const notices = [
    '重要: 好友系统',
    '私信系统',
    '消息系统',
    '重要：点赞系统',
  ];
  return (
    <div className="bg-orange-300 rounded-lg shadow-md px-4 py-2">
      <h2 className="text-gray-800 font-semibold mb-2">目标计划</h2>
      <ul className="list-disc ml-4">
        {notices.map((notice, index) => (
          <li key={index} className="text-gray-700 mb-1">
            {notice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeBoard;
