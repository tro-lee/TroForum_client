import React from 'react';
import { useModel } from '@@/exports';
import PersonTopicPost from '@/pages/person/PersonTopicPost';
import { history } from '@umijs/max';

export default () => {
  //获取当前id
  const { userId } = useModel('global');

  return (
    <div className="flex justify-center bg-gray-100 border border-gray-300 rounded-lg p-2">
      <div className="w-1/2 inline-block">
        <PersonTopicPost userId={userId} />
      </div>
      <button
        className="rounded-lg text-2xl mt-8 py-4 px-8 bg-blue-500 hover:bg-blue-700 active:bg-blue-800 text-white font-bold shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:shadow-outline"
        type={'button'}
        onClick={() => history.push('/person/' + userId)}
      >
        点我进入他人视角
      </button>
    </div>
  );
};
