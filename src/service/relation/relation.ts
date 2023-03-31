import {request} from '@umijs/max';

//检查关系
export function checkRelation(followerId: string) {
    return request<number>('/api/checkRelation', {
        method: 'POST',
        data: {
            followerId: followerId
        },
    });
}

//添加关注
export function follow(followerId: string) {
    return request<any>('/api/follow', {
        method: 'POST',
        data: {
            followerId: followerId
        },
    });
}

//取消关注
export function deleteFollower(followerId: string) {
    return request<any>('/api/deleteFollower', {
        method: 'POST',
        data: {
            followerId: followerId
        },
    });
}

//获取关注列表
export function getFollowerList() {
    return request<any>('/api/getFollowerList', {
        method: 'POST',
    });
}

//获取被关注列表
export function getFollowed() {
    return request<any>('/api/getFollowed', {
        method: 'POST',
    });
}
