import {request} from '@@/plugin-request';

export type Account = {
    userId: string;
    userName: string;
    avatarUrl: string;
    description: string;
};

//获取当前用户
export function postSelectAccount() {
    return request<Account>('/api/selectAccount', {
        method: 'POST',
        data: {},
    });
}

//查找特定用户
export function selectAccountById(userId: string) {
    return request<any>('/api/selectAccountById', {
        method: 'POST',
        data: {
            userId: userId,
        },
    });
}

//修改密码
export function updatePassword(password: string) {
    return request<any>('/api/updatePassword', {
        method: 'POST',
        data: {
            password: password,
        },
    });
}

//修改用户id
export function updateUserName(userName: string) {
    return request<any>('/api/updateUserName', {
        method: 'POST',
        data: {
            userName: userName,
        },
    });
}

//搜索用户
export function getSearchAccount(keyword: string) {
    return request<Array<Account>>('/api/getSearchAccount', {
        method: 'POST',
        data: {
            keyword: keyword,
        }
    })
}
