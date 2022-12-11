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
