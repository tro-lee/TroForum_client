import {request} from "@@/plugin-request";

export type Poem = {
    poemId: string;
    authorId: string;
    content: string;
    createdTime: Date;
    likes: number;
    title: string;
    userName: string;
    avatarUrl: string;
}

export function InsertPoem(authorId: string, content: string, title: string) {
    return request<any>('/api/poem/insPoem', {
        method: 'POST',
        data: {
            authorId: authorId,
            content: content,
            title: title,
        },
    });
}

export function GetPoemPage(
    current: number = 0,
    size: number = 5,
    keyword: string = '',
) {
    return request<any>('/api/poem/getPoemPage', {
        method: 'POST',
        data: {
            page: current,
            size: size,
            keyword: keyword,
        },
    });
}

export function GetPoemPageByAuthor(
    current: number = 0,
    size:number = 5,
    authorId: string = '',
) {
    return request<any>('/api/poem/getPoemPageByAuthor', {
        method: 'POST',
        data: {
            page: current,
            size: size,
            authorId: authorId,
        },
    });
}
