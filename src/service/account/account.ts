import { request } from '@@/plugin-request';

export type Account = {
  userId: string;
  userName: string;
};

export function PostSelectAccount() {
  return request<Account>('/api/selectAccount', {
    method: 'POST',
    data: {},
  });
}

export function SelectAccountById(userId: string) {
  return request<any>('/api/selectAccountById', {
    method: 'POST',
    data: userId,
  });
}

//修改密码
export function UpdatePassword(password: string) {
  return request<any>('/api/updatePassword', {
    method: 'POST',
    data: {
      password: password,
    },
  });
}

//修改用户id
export function UpdateUserName(userName: string) {
  return request<any>('/api/updateUserName', {
    method: 'POST',
    data: {
      userName: userName,
    },
  });
}
