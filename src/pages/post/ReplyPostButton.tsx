import {useModel} from '@@/exports';
import React, {useState} from 'react';
import {PostInsertReplyPost} from '@/service/post/post';
import {message} from 'antd';

const ReplyPostButton = (props: any) => {
    /*
     * 整体思路：
     * 1. 通过useModel获取用户id
     * 2. 通过useState设置评论内容
     * 3. 通过masterData[1]判断是回复别人还是评论帖子 0为评论帖子，其他为回复别人
     * 4. 通过masterData[2]判断回复谁 0为主帖，其他为回复谁
     */

    const {postId, masterData, setMasterData, setUpdate} = props;
    const {userId} = useModel('global');
    const [content, setContent] = useState('');
    const avatarLink = `https://api.multiavatar.com/${userId + postId}.png`;
    return (
        <div className="min-w-full min-h-50">
            <img src={avatarLink} alt="" className="w-16 h-16 inline"/>

            <div className="inline text-xl text-gray-600 ml-8">
                {masterData[1] === 0 ? "评论帖子" : `回复${masterData[2]}`}
            </div>

            <textarea
                className={`w-full bg-transparent pt-4 text-lg outline-none focus:text-gray-700 ${masterData[1] ? "ring-4 ring-gray-400 " : ""}"`}
                placeholder={masterData[1] === 0 ? "：元芳，你怎么看" : "回复别人也是在这里嗷~~"}
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

            <div className="mt-10">
                <button
                    type={"button"}
                    className="bg-gray-0 hover:bg-red-300 text-gray-800 font-bold py-2 px-4 rounded-l"
                    onClick={() => {
                        setMasterData[0](postId);
                        setMasterData[1](0);
                        setMasterData[2]("主帖");
                    }}
                >
                    {masterData[1] === 0 ? "点击别人评论框即可回复嗷" : "取消回复"}
                </button>
                <button
                    type={"button"}
                    className="bg-gray-0 hover:bg-red-300 text-gray-800 font-bold py-2 px-4 rounded-l"
                    onClick={() => {
                        setContent('');
                    }}
                >
                    清空内容
                </button>
                <button
                    type={"button"}
                    className="bg-gray-0 hover:bg-red-300 text-gray-800 font-bold py-2 px-4 rounded-r"
                    onClick={async () => {
                        try {
                            // @ts-ignore
                            if (!content) {
                                message.error('没写内容捏');
                                return;
                            }
                            await PostInsertReplyPost(userId, content, masterData[0], masterData[1])
                                .then(() => {
                                    setContent('');
                                    setUpdate(true);
                                    message.success('回复成功~');
                                    setMasterData[0](postId);
                                    setMasterData[1](0);
                                    setMasterData[2]("主帖");
                                });
                        } catch (e) {
                        }
                    }}>
                    发送评论
                </button>
                <div className="text-xl text-gray-400 float-right">
                    {content.length}/500
                </div>
            </div>
        </div>
    );
};

export default ReplyPostButton;
