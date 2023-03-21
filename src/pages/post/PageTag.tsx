import {GetReplyPostPage} from "@/service/post/post";
import React from "react";

const PageTag = (props: any) => {
    const {postId, page, setPage, pageNum, setPageNum, setData, setLoading} = props;
    return (
        <div>
            {
                //下面页标签
                Array.from({ length: pageNum }, (_, i) => i).map((item, index) => (
                    <div
                        key={index}
                        className={`m-3 w-7 h-7 ${
                            page === index + 1 ? 'bg-gray-600' : 'bg-gray-300'
                        } inline-flex text-2xl cursor-pointer`}
                        onClick={() => {
                            if (page === index + 1) return;
                            setLoading(true);
                            GetReplyPostPage(postId, index + 1).then((res) => {
                                setLoading(false);
                                // @ts-ignore
                                setData(res.value);
                                setPage(res.page);
                                setPageNum(res.page_num);
                            });
                        }}
                    />
                ))
            }
        </div>
    )
}

export default PageTag;
