import {dateDiff} from "@/service/common/time";
import React from "react";

const ReplyPostTemplate = (props: any) => {
    const {data, setMasterData} = props;
    return (
        <div className="mt-4 bg-gray-100 p-2 rounded-lg hover:bg-gray-200">
            <img src={`https://api.multiavatar.com/${data.authorId + data.master}.png`} alt="" className="w-10 h-10 inline"/>
            <div className="ml-8 text-xl inline break-words text-center whitespace-pre-wrap">
                {data.content}
            </div>
            <div className="cursor-pointer float-right text-gray-400" onClick={() => {
                setMasterData[0](data.postId);
                setMasterData[1](data.authorId);
                setMasterData[2](data.userName);
                window.scrollTo(0, 0)
            }}>
                回复
            </div>
            <div className="text-xl font-bold text-gray-400 relative">
                {data.userName}
            </div>
            <div className="text-sm inline-block text-gray-400">
                {dateDiff(data.createdTime, new Date().getTime())}
            </div>
            {
                //小评论区
                data.replyData.map((item: any, index: number) => {
                    return (
                        <div key={index} className="ml-5 mt-5 bg-gray-200 p-4 rounded-lg">
                            <img src={`https://api.multiavatar.com/${item.authorId + data.master}.png`} alt=""
                                 className="w-8 h-8 inline"/>
                            <div className="cursor-pointer text-gray-400 float-right" onClick={() => {
                                setMasterData[0](data.postId);
                                setMasterData[1](item.authorId);
                                setMasterData[2](item.userName);
                                window.scrollTo(0, 0);
                            }}>
                                回复
                            </div>
                            <div className="text-sm float-right clear-right text-gray-400">
                                {dateDiff(item.createdTime, new Date().getTime())}
                            </div>
                            <div className="ml-8 text-xl inline break-words text-center whitespace-pre-wrap">
                                {item.content}
                            </div>
                            <div className="text-xl font-bold text-gray-400 relative">
                                {item.userName}
                            </div>
                            <div className="text-sm">
                                回复给{item.ReplyName}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default ReplyPostTemplate;
