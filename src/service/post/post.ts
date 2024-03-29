import { request } from '@@/plugin-request';
import { PageType } from '@/service/ApiType';

export type TopicPost = {
  content: string;
  postId: string;
  authorId: string;
  createdTime: Date;
  likes: number;
  title: string;
  theme: string;
  clickRate: number;
  userName: string;
  avatarUrl: string;
};

export type ReplyPost = {
  postId: string;
  authorId: string;
  content: string;
  createdTime: Date;
  likes: number;
  master: string;
  userName: string;
  ReplyName: string;
  replyData: Array<ReplyPost>;
  avatarUrl: string;
};

export function postInsertTopicPost(
  authorId: string,
  content: string,
  title: string,
  theme: string,
) {
  return request<any>('/api/post/insTopicPost', {
    method: 'POST',
    data: {
      authorId: authorId,
      content: content,
      title: title,
      theme: theme,
    },
  });
}

export function postInsertReplyPost(
  authorId: string,
  content: string,
  master: string,
  masterUserId: string,
) {
  return request<any>('/api/post/insReplyPost', {
    method: 'POST',
    data: {
      authorId: authorId,
      content: content,
      master: master,
      masterUserId: masterUserId,
    },
  });
}

export function getTopicPostPage(
  current: number = 0,
  size: number = 5,
  keyword: string = '',
) {
  return request<PageType<TopicPost>>('/api/post/topicPostPage', {
    method: 'POST',
    data: {
      current: current,
      size: size,
      keyword: keyword,
    },
  });
}

export function getTopicPostPageByAuthor(
  current: number = 0,
  size: number = 5,
  authorId: string = '',
) {
  return request<PageType<TopicPost>>('/api/post/topicPostPageByAuthor', {
    method: 'POST',
    data: {
      current: current,
      size: size,
      authorId: authorId,
    },
  });
}

export function GetReplyPostPage(
  postId: string,
  current: number = 1,
  size: number = 5,
) {
  return request<PageType<ReplyPost>>('/api/post/replyPostPage', {
    method: 'POST',
    data: {
      current: current,
      size: size,
      postId: postId,
    },
  });
}

export function getTopicPost(postId: string) {
  return request<TopicPost>('/api/post/getTopicPost', {
    method: 'POST',
    data: {
      postId: postId,
    },
  });
}
