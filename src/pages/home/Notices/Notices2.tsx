import React from 'react';

const Notice2Board = () => {
    const notices = [
        "右上角可以写诗发布",
        "点击他人头像，即可进入他人界面",
        "可通过个人界面或者关注页面添加关注，并聊天"
    ];
    return (
        <div className="bg-pink-300 rounded-lg shadow-md px-4 py-2">
            <h2 className="text-gray-800 font-semibold mb-2">提示</h2>
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

export default Notice2Board;
