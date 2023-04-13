import React from 'react';

const NoticeBoard = () => {
    const notices = [
        '本项目为比赛项目，使用技术有',
        'react+tailwindcss',
        'springboot+mybatis+stomp',
        'docker+nginx+mysql',
    ];
    return (
        <div className="bg-orange-300 rounded-lg shadow-md px-4 py-2">
            <h2 className="text-gray-800 font-semibold mb-2">介绍</h2>
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
