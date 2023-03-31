import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {deleteFollower, getFollowed, getFollowerList} from "@/service/relation/relation";
import {message} from "antd";
import Loading from "@/components/Loading";

const FollowList = (props: any) => {
    const [showFollowing, setShowFollowing] = useState(true);
    const [followingData, setFollowingData] = useState({length: 0, value: []});
    const [followerData, setFollowerData] = useState({length: 0, value: []});
    const [loading, setLoading] = useState(false);
    const {update, setUpdate, setUpdateChat, relationId, setRelationId} = props;
    const updateData = () => {
        setLoading(true);
        getFollowerList().then(res => {
            setLoading(false);
            setFollowingData(res);
            console.log(res);
        })
        getFollowed().then(res => {
            setFollowerData(res);
            console.log(res);
        })
    }

    useEffect(() => {
        if (update) {
            setUpdate(false);
            updateData();
        }
    })

    useEffect(() => {
        updateData();
    }, [])

    return (
        loading? <Loading/>
        :<div className="flex flex-col items-center border bg-white p-4 rounded-lg">
            <div className="flex justify-center mb-4">
                <button
                    type="button"
                    className={classNames("px-4 py-2 rounded-l-lg", {
                        "bg-blue-500 text-white": showFollowing,
                        "bg-gray-200 text-gray-500": !showFollowing,
                    })}
                    onClick={() => setShowFollowing(true)}
                >
                    我的关注 ({followingData.length})
                </button>
                <button
                    type="button"
                    className={classNames("px-4 py-2 rounded-r-lg", {
                        "bg-blue-500 text-white": !showFollowing,
                        "bg-gray-200 text-gray-500": showFollowing,
                    })}
                    onClick={() => setShowFollowing(false)}
                >
                    订阅者 ({followerData.length})
                </button>
            </div>

            <div className="w-full max-w-md">
                {showFollowing
                    ? followingData.value.map((user: any) => (
                        <div key={user.userId} className="flex justify-between mb-4">
                            <div className="flex items-center">
                                <img
                                    src={`https://picsum.photos/50/50?random=${user.userId}`}
                                    alt={user.userName}
                                    className="w-10 h-10 rounded-full mr-4"
                                />
                                <div>
                                    <div className="font-bold">{user.userName}</div>
                                    <div className="text-gray-500">@{user.userId}</div>
                                </div>
                            </div>
                            <button type="button"
                                    className="inline-flex items-center justify-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    onClick={() => {
                                        if (relationId !== user.relationId) {
                                            setUpdateChat(true);
                                            setRelationId(user.relationId);
                                        }
                                    }}>
                                聊天
                            </button>
                            <button type="button"
                                    className="inline-flex items-center justify-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    onClick={() => {
                                        deleteFollower(user.userId).then(() => {
                                            message.success("取关成功");
                                            getFollowerList().then(res => {
                                                setFollowingData(res);
                                            })
                                        })
                                    }}>
                                删除
                            </button>
                        </div>
                    ))
                    : followerData.value.map((user: any) => (
                        <div key={user.userId} className="flex items-center mb-4">
                            <img
                                src={`https://picsum.photos/50/50?random=${user.userId}`}
                                alt={user.userName}
                                className="w-10 h-10 rounded-full mr-4"
                            />
                            <div>
                                <div className="font-bold">{user.userName}</div>
                                <div className="text-gray-500">@{user.userId}</div>
                            </div>
                            <button type="button"
                                    className="inline-flex items-center justify-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    onClick={() => {
                                        if (relationId !== user.relationId) {
                                            setUpdateChat(true);
                                            setRelationId(user.relationId);
                                        }
                                    }}>
                                聊天
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default FollowList;
