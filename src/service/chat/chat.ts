import {request} from "@umijs/max";
import {Message, PageType} from "@/service/ApiType";

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

//发送公屏聊天
export function insertPublicChat(content: string) {
    return request<any>('/api/insertPublicChat', {
        method: 'POST',
        data: {
            content: content
        },
    });
}

//获取私聊聊天页
export function getPrivateChatPage(
    current: number = 0, size: number = 6, keyword: string = '', relationId: string = ''
) {
    return request<PageType<Message>>('/api/getPrivateChatPage', {
        method: 'POST',
        data: {
            current: current,
            size: size,
            keyword: keyword,
            relationId: relationId,
        },
    });
}

//插入私聊聊天
export function insertPrivateChat(content: string, relationId: string) {
    return request<any>('/api/insertPrivateChat', {
        method: 'POST',
        data: {
            content: content,
            relationId: relationId,
        },
    });
}
