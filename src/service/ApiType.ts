export type ResponseData<T> = {
  code: number;
  mas: string;
  data: T;
};

export type PageType<T> = {
  offset: number;
  page: number;
  page_num: number;
  size: number;
  total: number;
  value: Array<T>;
};

export type Message = {
  avatarUrl: string;
  authorId: string;
  authorName: string;
  content: string;
  createdTime: string;
}
