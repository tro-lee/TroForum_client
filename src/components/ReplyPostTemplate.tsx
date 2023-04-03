import {dateDiff} from '@/service/common/time';
import React from 'react';
import Avatar from "@/components/Avatar";

const ReplyPostTemplate = (props: any) => {
    const {data, setMasterData} = props;
    return (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg hover:bg-gray-200">
            <div className="flex items-center mb-4">
                <div className="w-16">
                    <Avatar userId={data.authorId} avatarUrl={data.avatarUrl}/>
                </div>
                <div className="text-xl ml-4 font-bold">{data.userName}</div>
                <div className="text-sm text-gray-400 ml-auto">
                    {dateDiff(data.createdTime, new Date().getTime())}
                </div>
                <div
                    className="cursor-pointer text-gray-400 ml-4 hover:text-gray-600"
                    onClick={() => {
                        setMasterData[0](data.postId);
                        setMasterData[1](data.authorId);
                        setMasterData[2](data.userName);
                        window.scrollTo(0, 0);
                    }}
                >
                    回复
                </div>
            </div>
            <div className="text-xl break-words whitespace-pre-wrap mb-4">
                {data.content}
            </div>
            {
                //回复评论区
                data.replyData.map((item: any, index: number) => {
                    return (
                        <div key={index} className="ml-8 mb-4">
                            <div className="flex items-center">
                                <div className="w-8">
                                    <Avatar userId={item.authorId} avatarUrl={item.avatarUrl}/>
                                </div>
                                <div className="text-xl ml-4 font-bold">{item.userName}</div>
                                <div className="text-sm text-gray-400 ml-auto">
                                    {dateDiff(item.createdTime, new Date().getTime())}
                                </div>
                                <div
                                    className="cursor-pointer text-gray-400 ml-4 hover:text-gray-600"
                                    onClick={() => {
                                        setMasterData[0](data.postId);
                                        setMasterData[1](item.authorId);
                                        setMasterData[2](item.userName);
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    回复
                                </div>
                            </div>
                            <div className="ml-16 text-lg break-words whitespace-pre-wrap mb-1">
                                {item.content}
                            </div>
                            <div className="text-sm text-gray-400 ml-16">
                                回复给{item.ReplyName}
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default ReplyPostTemplate;
