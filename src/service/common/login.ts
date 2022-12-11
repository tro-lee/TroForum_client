//注册账号
import { request } from '@@/plugin-request';

export function PostRegister(userName: string, password: string) {
  return request<any>('/api/register', {
    method: 'POST',
    data: {
      userName: userName,
      password: password,
    },
  });
}

export function PostLogin(userName: string, password: string) {
  return request<any>('/api/login', {
    method: 'POST',
    data: {
      userName: userName,
      password: password,
    },
  });
}

export function PostLogout() {
  return request<any>('/api/logout', {
    method: 'POST',
    data: {},
  });
}
