import React, {useEffect, useState} from 'react';
import {GetReplyPostPage} from '@/service/post/post';
import ReplyPostTemplate from '@/components/ReplyPostTemplate';
import PageTag from "@/pages/post/PageTag";
import Loading from "@/components/Loading";

const ReplyPostBubble = (props: any) => {
    /*
     * 1. 获取回复帖子的数据
     * 2. 传递给ReplyPostTemplate
     * 3. 传递给ReplyPostButton
     * 4. 通过setMasterData更新评论区给谁评论
     */
    const {postId, setMasterData, update, setUpdate} = props;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageNum, setPageNum] = useState(0);
    const updateData = () => {
        setUpdate(false);
        setLoading(true);
        GetReplyPostPage(postId, page).then((res) => {
            // @ts-ignore
            setData(res.value);
            setPageNum(res.page_num);
            setLoading(false);
        });
    };

    useEffect(() => {
        if (update) {
            updateData();
        }
    });

    useEffect(() => {
        updateData();
    }, []);

    return (
        <div>
            {loading ? <Loading/> :
                <div>
                    {
                        //回复泡泡
                        data.map((item, index) => {
                            return (
                                <div key={index}>
                                    <ReplyPostTemplate
                                        data={item}
                                        setMasterData={setMasterData}
                                    />
                                </div>
                            );
                        })
                    }
                    <PageTag postId={postId} page={page} setPage={setPage} pageNum={pageNum} setPageNum={setPageNum}
                             setLoading={setLoading} setData={setData}/>
                </div>
            }
        </div>
    );
};

export default ReplyPostBubble;
