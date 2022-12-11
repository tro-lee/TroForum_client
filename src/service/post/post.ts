import { request } from '@@/plugin-request';
import { PageType } from '@/service/ApiType';

export function PostInsertTopicPost(
  authorId: string,
  content: string,
  title: string,
  theme: string,
  introduction: string,
) {
  return request<any>('/api/post/topicPost', {
    method: 'POST',
    data: {
      authorId: authorId,
      content: content,
      title: title,
      theme: theme,
      introduction: introduction,
    },
  });
}

export function PostInsertReplyPost(
  authorId: string,
  content: string,
  master: string,
) {
  return request<any>('/api/post/replyPost', {
    method: 'POST',
    data: {
      authorId: authorId,
      content: content,
      master: master,
    },
  });
}

export type TopicPostPage = {
  postId: string;
  authorId: string;
  content: string;
  createdTime: Date;
  deleted: boolean;
  likes: number;
  title: string;
  theme: string;
  introduction: string;
  clickRate: number;
  userName: string;
};

export function GetTopicPostPage(
  current: number = 0,
  size: number = 5,
  keyword: string = '',
) {
  return request<PageType<TopicPostPage>>('/api/post/topicPostPage', {
    method: 'POST',
    data: {
      current: current,
      size: size,
      keyword: keyword,
    },
  });
}
