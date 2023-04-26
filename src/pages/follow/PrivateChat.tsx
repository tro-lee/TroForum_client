import React, {useEffect, useRef, useState} from "react";
import {getPrivateChatPage, insertPrivateChat} from "@/service/chat/chat";
import {message} from "antd";
import {IP} from "@/constants";
import {Message} from "@/service/ApiType";
import SockJsClient from 'react-stomp'
import Avatar from "@/components/Avatar";
import {useModel} from "@@/exports";

const PrivateChat = (props: any) => {
    /*
    * 1.获取chat信息
    * 2.连接WebSocket服务器
    * 3.发送消息
    * 4.滚轮刷新
     */
    const {userId} = useModel('global');
    const {relationId, update, setUpdate} = props;
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [online, setOnline] = useState(false);
    //滚轮刷新
    const [request, setRequest] = useState(true);
    const chatBoxRef = useRef(null);

    //分页信息
    const [page, setPage] = useState({
        current: 1,
        size: 6,
        total: 0,
        pageNum: 0,
    });

    //更新
    const updateData = () => {
        // 获取chat信息
        getPrivateChatPage(0, 6, '', relationId.split("-").sort().join("-")).then(res => {
            console.log(res);
            setPage({
                current: res.page,
                size: res.size,
                total: res.total,
                pageNum: res.page_num,
            })
            setMessages(res.value);
        })
    }

    //初始加载
    useEffect(() => {
        updateData();
    }, []);

    //检测更新
    useEffect(() => {
        if (update) {
            setMessages([]);
            setUpdate(false);
            updateData();
        }
    });

    //发送消息
    const sendMessage = async () => {
        if (!inputValue) {
            message.error('请输入消息');
            return;
        }
        if (inputValue.length > 300) {
            message.error('消息长度不能超过300');
            return;
        }
        await insertPrivateChat(inputValue, relationId).then(() => {
            // @ts-ignore
            chatBoxRef.current.scrollTop = 0;
            setInputValue('');
            message.success('发送成功');
        })
    };

    //滚轮刷新
    const scroll = () => {
        // @ts-ignore
        const scrollTop = chatBoxRef.current.scrollTop;
        if (scrollTop < -(messages.length - 3) * 90 && request && page.pageNum !== page.current) {
            setRequest(false);
            getPrivateChatPage(page.current + 1, 6, '', relationId).then(res => {
                setPage({
                    current: res.page,
                    size: res.size,
                    total: res.total,
                    pageNum: res.page_num,
                })
                setRequest(true);
                setMessages(messages => [...messages, ...res.value]);
            })
        }
    };

    //作用：防抖
    function throttle(func: any, delay: number) {
        let timer: NodeJS.Timeout | null = null;
        return () => {
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const context = this;
            const args = arguments;
            if (!timer) {
                timer = setTimeout(function () {
                    func.apply(context, args);
                    timer = null;
                }, delay);
            }
        };
    }

    return (
        <div className="w-full h-full p-4 bg-white rounded-lg shadow-lg border border-gray-300">
            <SockJsClient
                url={IP + '/ws'}
                topics={[`/queue/privateChat/${relationId.split("-").sort().join("-")}`]}
                onMessage={() => {
                    setUpdate(true);
                }}
                onConnect={() => setOnline(true)}
                onDisconnect={() => setOnline(false)}
            />

            <div className="flex flex-col space-y-4 h-screen">
                <div className="flex-1 flex flex-col-reverse space-y-4 overflow-y-auto" ref={chatBoxRef} onScroll={throttle(scroll, 10)}>
                    {messages.map((message, index) => (
                        <div key={index} className={`p-2 flex space-x-2 ${message.authorId === userId ? "justify-end items-end" : "justify-start items-start"}`}>
                            {message.authorId !== userId && (
                                <div className="flex flex-col">
                                    <Avatar userId={message.authorId} size={20} avatarUrl={message.authorAvatarUrl} />
                                </div>
                            )}
                            <div className={`flex flex-col space-y-1 ${message.authorId === userId ? "items-end text-right" : "items-start text-left"}`}>
                                <div className={`text-gray-700 rounded-lg p-2 break-all ${message.authorId === userId ? "bg-blue-500 text-white" : "bg-gray-100"}`} >{message.content}</div>
                                <div className="text-gray-500 text-xs">{message.createdTime}</div>
                            </div>
                            {message.authorId === userId && (
                                <div className="flex flex-col">
                                    <Avatar userId={message.authorId} size={20} avatarUrl={message.authorAvatarUrl} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="p-2 flex relative bottom-0">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        placeholder="请输入消息"
                        className="px-2 py-1 border border-gray-300 rounded w-full"
                    />
                    {online ?
                        <button
                            type="submit"
                            onClick={sendMessage}
                            className="ml-2 px-4 py-1 bg-blue-500 text-white rounded"
                        >
                            发送
                        </button> :
                        <button
                            type="submit"
                            onClick={sendMessage}
                            className="ml-2 px-4 py-1 bg-red-500 text-white rounded"
                            disabled
                        >
                            已离线
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default PrivateChat;
