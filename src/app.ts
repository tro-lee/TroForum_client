// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
import { message } from 'antd';
import { RequestConfig } from '@@/plugin-request/request';
import { history } from '@umijs/max';
import { PostSelectAccount } from '@/service/account/account';

export async function getInitialState(): Promise<{ name: string; id: string }> {
  const account = await PostSelectAccount();
  return { name: account.userName, id: account.userId };
}

export const layout = () => {
  return {
    title: 'TroTro的论坛',
    menu: {
      locale: false,
    },
  };
};

export const request: RequestConfig = {
  timeout: 20000,
  errorConfig: {
    errorHandler: (error) => {
      //responseInterceptors捕捉不到
      // @ts-ignore
      if (error.code === 'ERR_BAD_RESPONSE') {
        message.error('服务器寄了');
        return;
      }
      message.error(error.message);
    },
  },
  responseInterceptors: [
    (response) => {
      // @ts-ignore
      const {
        data: { code, msg },
      } = response;
      switch (code) {
        case 500:
          throw new Error(msg);
        case 501:
          message.error('未登录账号');
          history.push('/login');
          break;
      }
      return response;
    },
  ],
};
