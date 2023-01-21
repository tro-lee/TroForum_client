import {useEffect, useRef, useState} from 'react';
import {GetTopicPostPage, TopicPostPage} from '@/service/post/post';
import "./TopicPostBubble.css"

const TopicPostBubble = () => {
    //帖子
    const [listData, setListData] = useState(Array<TopicPostPage>);
    //页
    const [page, setPage] = useState({current: 1, size: 9, total: 5, pageNum: 0});
    //元素高度
    const itemHeight = 90;
    const screenH = window.screen.height;
    //初始获取数据
    useEffect(() => {
        GetTopicPostPage(page.current, page.size).then((it) => {
            setPage({current: it.page, size: it.size, total: it.total, pageNum: it.page_num});
            setListData(it.value);
        });
    }, [])

    const slider = useRef(null);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(9);

    let isRequest = false;

    function throttle(func: any, delay: number){
        let timer: NodeJS.Timeout | null = null;
        return () => {
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const context = this;
            const args = arguments;
            if(!timer){
                timer = setTimeout(function(){
                    func.apply(context, args);
                    timer = null;
                }, delay);
            }
        }
    }

    const scroll = () => {
        // @ts-ignore
        const scrollTop = slider.current.scrollTop;
        if ( listData.length * itemHeight - scrollTop - screenH < 400 && !isRequest ) {
            isRequest = true;
            if ( page.current === page.pageNum ) {
                GetTopicPostPage(0, page.size).then((it) => {
                    setPage({current: it.page, size: it.size, total: it.total, pageNum: it.page_num});
                    setListData(listData.concat(it.value));
                });
            } else {
                GetTopicPostPage(page.current + 1, page.size).then((it) => {
                    setPage({current: it.page, size: it.size, total: it.total, pageNum: it.page_num});
                    setListData(listData.concat(it.value));
                });
            }
        }
        let currentStartIndex = Math.floor(scrollTop / itemHeight);
        let currentEndIndex = currentStartIndex + Math.ceil(screenH / itemHeight);
        if ( currentStartIndex === startIndex && currentEndIndex === endIndex ) return
        requestAnimationFrame(() => {
            setStartIndex(currentStartIndex);
            setEndIndex(currentEndIndex);
        })
    }

    return (
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
                                    transform:  `translateY(${(startIndex + index) * itemHeight}px)`,
                                }}
                            >
                                <div className="ml-5 w-1/3 text-2xl inline-block text-gray-400">{item.userName}</div>
                                <div className="text-sm inline-block text-gray-400">{item.createdTime}</div>
                                <div/>
                                <div className="top-2 ml-5 w-4/5 text-4xl inline-block">{item.title}</div>
                                <div className="text-1xl inline-block text-gray-400">👍{item.likes}</div>
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    )
};

export default TopicPostBubble;
