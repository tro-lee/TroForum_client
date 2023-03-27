import { history } from '@@/core/history';
import React from 'react';

const BackButton = () => {
  return (
    <button
      type="submit"
      className="inline mb-2 text-gray-400 text-lg font-bold border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-400 hover:text-white transition-colors duration-300"
      onClick={() => history.back()}
    >
      返回
    </button>
  );
};

export default BackButton;
