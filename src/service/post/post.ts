import {request} from "@@/plugin-request";
import {ResponseData} from "@/service/ApiType";

export function PostInsertTopicPost(
    authorId: string, content: string, title: string,
    theme: string, introduction: string
) {
    return request<ResponseData<any>>('/api/post/topicPost', {
        method: 'POST',
        data: {
            authorId: authorId,
            content: content,
            title: title,
            theme: theme,
            introduction: introduction
        }
    })
}

export function PostInsertReplyPost(
    authorId: string, content: string, master: string
) {
    return request<ResponseData<any>>('/api/post/replyPost', {
        method: 'POST',
        data: {
            authorId: authorId,
            content: content,
            master: master
        }
    })
}
