import React, {useEffect, useRef, useState} from 'react';
import {GetTopicPostPage, TopicPost} from '@/service/post/post';
import "./TopicPostBubble.css"
import {dateDiff} from '@/service/common/time';

const TopicPostBubble = (props: any) => {
    //加载
    const [loading, setLoading] = useState(true);
    //获取传递的参数
    const {setPostId, update, setUpdate} = props;
    //帖子
    const [listData, setListData] = useState(Array<TopicPost>);
    //页
    const [page, setPage] = useState({current: 1, size: 9, total: 8, pageNum: 0});
    //元素高度
    const itemHeight = 90;
    const screenH = window.screen.height;
    const slider = useRef(null);

    //更新方法
    const updateData = () => {
        setLoading(true);
        GetTopicPostPage(1, 9).then((it) => {
            setPage({current: it.page, size: it.size, total: it.total, pageNum: it.page_num});
            setListData(it.value);
            setLoading(false);
        });
        // @ts-ignore
        slider.current.scrollTop = 0;
    }

    //刷新
    if (update) {
        updateData();
        setUpdate(0);
    }
    //初始获取数据
    useEffect(() => {
        updateData();
    }, [])
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(9);

    let isRequest = false;

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
        }
    }

    const scroll = () => {
        // @ts-ignore
        const scrollTop = slider.current.scrollTop;
        if (listData.length * itemHeight - scrollTop - screenH < 400 && !isRequest) {
            isRequest = true;
            if (page.current === page.pageNum) {
                // @ts-ignore
                if (slider.current.scrollTop > itemHeight * listData.length - screenH + 400) {
                    // @ts-ignore
                    slider.current.scrollTop = itemHeight * listData.length - screenH + 300;
                }
            } else {
                setLoading(true);
                GetTopicPostPage(page.current + 1, page.size).then((it) => {
                    setPage({current: it.page, size: it.size, total: it.total, pageNum: it.page_num});
                    setListData(listData.concat(it.value));
                    setLoading(false);
                });
            }
        }
        let currentStartIndex = Math.floor(scrollTop / itemHeight);
        let currentEndIndex = currentStartIndex + Math.ceil(screenH / itemHeight);
        if (currentStartIndex === startIndex && currentEndIndex === endIndex) return
        requestAnimationFrame(() => {
            setStartIndex(currentStartIndex);
            setEndIndex(currentEndIndex);
        })
    }

    return (
        <div>
            {loading ? (
                <div role="status" className="text-center">
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
            ) : (<div/>)}

            <div className="main" ref={slider} onScroll={throttle(scroll, 200)}>
                <div
                    className="wrap"
                    style={{
                        height: listData.length * itemHeight * 2
                    }}
                >
                    {listData.slice(startIndex, endIndex).map((item, index) => {
                            return (
                                <div
                                    className="border-t hover:border-gray-900 hover:text-red-300"
                                    key={index}
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: 10,
                                        width: '100%',
                                        transform: `translateY(${(startIndex + index) * itemHeight}px)`,
                                    }}
                                    onClick={() => {
                                        setPostId(item.postId)
                                    }}
                                >
                                    <div className="ml-5 w-1/3 text-2xl inline-block text-gray-400">{item.userName}</div>
                                    <div className="text-sm inline-block text-gray-400">{dateDiff(item.createdTime, new Date().getTime())}</div>
                                    <div className="top-2 ml-5 w-4/5 text-4xl inline-block truncate">{item.title}</div>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        </div>
    );
};
export default TopicPostBubble;
