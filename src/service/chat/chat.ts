import {request} from "@umijs/max";
import {PageType} from "@/service/ApiType";
import { Message } from "@/pages/home/Chat/Chat";

//获取公屏聊天页
export function getPublicChatPage(
    current: number = 0, size: number = 6, keyword: string = ''
) {
    return request<PageType<Message>>('/api/getPublicChatPage', {
        method: 'POST',
        data: {
            current: current,
            size: size,
            keyword: keyword,
        },
    });
}

//发送聊天
export function insertPublicChat(content: string) {
    return request<any>('/api/insertPublicChat', {
        method: 'POST',
        data: {
            content: content
        },
    });
}
