import React, {useEffect, useRef, useState} from 'react';
import {getTopicPostPage, TopicPost} from '@/service/post/post';
import './TopicPostBubble.css';
import {dateDiff} from '@/service/common/time';
import {history} from '@umijs/max';
import {searchPoems} from "@/components/sentence";

export function getColorCode(num: number) {
    switch (num) {
        case 0:
            return 'bg-blue-300';
        case 1:
            return 'bg-red-100';
        case 2:
            return 'bg-red-300';
        case 3:
            return 'bg-orange-400';
        case 4:
            return 'bg-orange-300';
        case 5:
            return 'bg-yellow-100';
        case 6:
            return 'bg-yellow-300';
        case 7:
            return 'bg-green-100';
        case 8:
            return 'bg-green-300';
        case 9:
            return 'bg-teal-100';
        case 10:
            return 'bg-teal-300';
        case 11:
            return 'bg-blue-100';
        case 12:
            return 'bg-blue-300';
        case 13:
            return 'bg-indigo-100';
        case 14:
            return 'bg-indigo-300';
        case 15:
            return 'bg-purple-100';
        case 16:
            return 'bg-purple-300';
        case 17:
            return 'bg-pink-100';
        case 18:
            return 'bg-pink-300';
        case 19:
            return 'bg-cyan-100';
        case 20:
            return 'bg-cyan-300';
        case 21:
            return 'bg-gray-200';
        default:
            return '';
    }
}

const TopicPostBubble = (props: any) => {
    /*
     * 1.获取帖子
     * 2.滚动加载
     * 3.搜索
     * 4.点击跳转
     */

    //加载
    const [loading, setLoading] = useState(true);

    //获取传递的参数
    const {update, setUpdate} = props;

    //帖子
    const [listData, setListData] = useState(Array<TopicPost>);

    //页
    const [page, setPage] = useState({
        current: 1,
        size: 9,
        total: 8,
        pageNum: 0,
    });

    //元素高度
    const itemHeight = 97;
    const screenH = window.screen.height;
    const slider = useRef(null);

    //搜索值
    const [search, setSearch] = useState('');

    //窗口标签
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(9);
    //是否请求
    let isRequest = false;

    //防抖搜索
    useEffect(() => {
        const timer = setTimeout(() => {
            setUpdate(true);
        }, 200);
        return () => clearTimeout(timer);
    }, [search]);

    //更新方法
    const updateData = () => {
        setUpdate(false);
        setLoading(true);
        getTopicPostPage(1, 9, search).then((it) => {
            setPage({
                current: it.page,
                size: it.size,
                total: it.total,
                pageNum: it.page_num,
            });
            setListData(it.value.sort(() => Math.random() - 0.5));
            setLoading(false);
        });
        // @ts-ignore
        slider.current.scrollTop = 0;
    };

    //刷新
    useEffect(() => {
        if (update) {
            updateData();
        }
    });

    //初始获取数据
    useEffect(() => {
        updateData();
    }, []);

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

    //滚动加载
    const scroll = () => {
        // @ts-ignore
        const scrollTop = slider.current.scrollTop;
        if (
            listData.length * itemHeight - scrollTop - screenH < 500 &&
            !isRequest
        ) {
            isRequest = true;
            if (page.current === page.pageNum) {
                if (
                    // @ts-ignore
                    slider.current.scrollTop >
                    itemHeight * listData.length - screenH + 600
                ) {
                    // @ts-ignore
                    slider.current.scrollTop =
                        itemHeight * listData.length - screenH + 400;
                }
            } else {
                setLoading(true);
                getTopicPostPage(page.current + 1, page.size, search).then((it) => {
                    setPage({
                        current: it.page,
                        size: it.size,
                        total: it.total,
                        pageNum: it.page_num,
                    });
                    setListData(
                        listData.concat(it.value.sort(() => Math.random() - 0.5)),
                    );
                    setLoading(false);
                });
            }
        }
        let currentStartIndex = Math.floor(scrollTop / itemHeight);
        let currentEndIndex = currentStartIndex + Math.ceil(screenH / itemHeight);
        if (currentStartIndex === startIndex && currentEndIndex === endIndex)
            return;
        requestAnimationFrame(() => {
            setStartIndex(currentStartIndex);
            setEndIndex(currentEndIndex);
        });
    };

    //气泡样式
    const [hoverIndex, setHoverIndex] = useState(-1);
    const handleMouseEnter = (index: any) => {
        setHoverIndex(index);
    };
    const handleMouseLeave = () => {
        setHoverIndex(-1);
    };

    return (
        <div>
            <div className="relative text-gray-600 w-1/2 inline">
                <input
                    className="ml-2 mb-2 w-4/5 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="search"
                    name="search"
                    placeholder={searchPoems[Math.floor(Math.random() * searchPoems.length)]}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <div role="status" className="text-center w-1/2 inline">
                    <svg
                        className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span className="sr-only">加载中...</span>
                </div>
            ) : (
                <div/>
            )}

            <div className="main" ref={slider} onScroll={throttle(scroll, 10)}>
                <div
                    className="wrap"
                    style={{
                        height: listData.length * itemHeight * 2,
                    }}
                >
                    {listData.slice(startIndex, endIndex).map((item, index) => {
                        const isHovering = index === hoverIndex;
                        const translateX = isHovering ? '-25px' : '0';
                        return (
                            <div
                                key={index}
                                className="flex justify-between items-center"
                            >
                                <div
                                    className={`border-t ${getColorCode(
                                        Number(item.postId.slice(-2)) % 21,
                                    )} rounded-lg shadow-lg py-4 px-2 m-2`}
                                    key={index}
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: (index * itemHeight) / 6,
                                        width: '100%',
                                        transform: `translateY(${
                                            (startIndex + index) * itemHeight
                                        }px) translateX(${translateX})`,
                                    }}
                                    onClick={() => {
                                        history.push(`/post/${item.postId}`);
                                    }}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <div className="text-gray-400 text-2xl font-bold">
                                                {item.userName}
                                            </div>
                                        </div>
                                        <div className="text-sm text-white">
                                            {dateDiff(item.createdTime, new Date().getTime())}
                                        </div>
                                    </div>
                                    <div className="ml-5 mt-2 text-gray-500 text-2xl font-bold">
                                        {item.title}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
export default TopicPostBubble;
