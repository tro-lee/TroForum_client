import {GetTopicPost, TopicPost} from "@/service/post/post";
import React, {useEffect, useState} from "react";
import TopicPostTemplate from "@/components/TopicPostTemplate";
import Loading from "@/components/Loading";

const TopicPostContent = (props: any) => {
    const {postId} = props;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<TopicPost>({
        authorId: "",
        clickRate: 0,
        createdTime: new Date(),
        likes: 0,
        postId: "",
        theme: "",
        title: "",
        userName: "",
        content: "暂无"
    });
    useEffect(() => {
        GetTopicPost(postId).then(it => {
            setData(it);
            setLoading(false)
        })
    }, [])
    return (
        <div>
            {loading ? <Loading/> :
                <div>
                    <TopicPostTemplate data={data}/>
                </div>
            }
        </div>
    )
}

export default TopicPostContent
