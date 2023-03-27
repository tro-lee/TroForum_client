import { request } from '@umijs/max';

//检查关系
export function CheckRelation(friendId: string) {
  return request<any>('/api/checkRelation', {
    method: 'POST',
    data: {
      friendId: friendId,
    },
  });
}

//加好友
export function AddFriend(friendId: string) {
  return request<any>('/api/addFriend', {
    method: 'POST',
    data: {
      friendId: friendId,
    },
  });
}

//同意好友请求
export function AgreeFriendRequest(friendId: string) {
  return request<any>('/api/agreeFriend', {
    method: 'POST',
    data: {
      friendId: friendId,
    },
  });
}

//拒绝好友请求
export function RefuseFriendRequest(friendId: string) {
  return request<any>('/api/deleteFriend', {
    method: 'POST',
    data: {
      friendId: friendId,
    },
  });
}

//删除好友
export function DeleteFriend(friendId: string) {
  return request<any>('/api/deleteFriend', {
    method: 'POST',
    data: {
      friendId: friendId,
    },
  });
}

//获取好友列表
export function GetFriendList() {
  return request<any>('/api/getFriendList', {
    method: 'POST',
    data: {},
  });
}

//获取好友请求列表
export function GetFriendRequestList() {
  return request<any>('/api/getFriendRequestList', {
    method: 'POST',
    data: {},
  });
}
