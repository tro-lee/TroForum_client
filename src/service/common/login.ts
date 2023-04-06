//注册账号
import { request } from '@@/plugin-request';

export function postRegister(userName: string, password: string) {
  return request<any>('/api/register', {
    method: 'POST',
    data: {
      userName: userName,
      password: password,
    },
  });
}

export function postLogin(userName: string, password: string) {
  return request<any>('/api/login', {
    method: 'POST',
    data: {
      userName: userName,
      password: password,
    },
  });
}

export function postLogout() {
  return request<any>('/api/logout', {
    method: 'POST',
    data: {},
  });
}
