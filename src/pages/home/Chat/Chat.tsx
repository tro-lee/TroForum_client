import React, {useState, useEffect, useRef} from 'react';
import {getPublicChatPage, insertPublicChat} from "@/service/chat/chat";
import {message} from "antd";

export type Message = {
    userName: string;
    content: string;
    createdTime: string;
}

const Chat = () => {
    /*
    * 1.获取chat信息
    * 2.连接WebSocket服务器
    * 3.发送消息
    * 4.滚轮刷新
     */
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

    //初始加载
    useEffect(() => {

        // 获取chat信息
        getPublicChatPage(0, 6).then(res => {
            setPage({
                current: res.page,
                size: res.size,
                total: res.total,
                pageNum: res.page_num,
            })
            setMessages(res.value);
        })

        // 连接WebSocket服务器
        const ws = new WebSocket('ws://localhost:8080/api/ws');
        ws.onopen = () => {
            setOnline(true);
            console.log('WebSocket连接成功');
        };
        ws.onmessage = (event) => {
            console.log(event.data);
            setMessages(messages => [...messages, JSON.parse(event.data)]);
        };

        // 组件卸载时关闭WebSocket连接
        return () => {
            // 关闭WebSocket连接
            setOnline(false);
            ws.close();
        };
    }, []);

    //发送消息
    const sendMessage = async () => {
        if (!inputValue) {
            message.error('请输入消息');
            return;
        }
        if (inputValue.length > 100) {
            message.error('消息长度不能超过100');
            return;
        }
        await insertPublicChat(inputValue).then(() => {
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
            getPublicChatPage(page.current + 1, 6).then(res => {
                setPage({
                    current: res.page,
                    size: res.size,
                    total: res.total,
                    pageNum: res.page_num,
                })
                setRequest(true);
                setMessages(messages => [...res.value, ...messages]);
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
        <div className="h-96 p-4 bg-white rounded-lg shadow-lg border border-gray-300">
            <div className="flex flex-col h-full">
                <div className="flex-1 flex flex-col-reverse space-y-4 overflow-y-auto" ref={chatBoxRef} onScroll={throttle(scroll, 10)}>
                    {messages.slice().reverse().map((message, index) => (
                        <div key={index} className="p-2 flex flex-col space-y-2">
                            <div className="font-medium text-blue-600">
                                {message.userName}
                            </div>
                            <div>
                                {message.content}
                            </div>
                            <div className="text-xs">
                                {message.createdTime}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-2 flex">
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

export default Chat;
