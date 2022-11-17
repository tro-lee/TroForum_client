import React from 'react';
import { ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { PostLogin } from '@/service/common/login';
import { message } from 'antd';
import { history } from '@umijs/max';
import { Link } from '@umijs/max';

export default function Page() {
  return (
    <div className="min-h-screen min-w-screen bg-red-300">
      <div className="flex items-center justify-center pt-20">
        <ProCard
          style={{ marginBlockStart: 75, maxWidth: 400 }}
          gutter={8}
          title="登录"
          direction="column"
          hoverable
          bordered
          extra={<Link to="/register">跳转至注册</Link>}
        >
          <ProForm<{
            userName: string;
            password: string;
          }>
            onFinish={async (values) => {
              await PostLogin(values.userName, values.password);
              message.success('登录成功');
              history.push('/home');
            }}
            submitter={{
              resetButtonProps: {
                style: {
                  display: 'none',
                },
              },
              render: (props) => {
                return [
                  <button
                    className="min-w-full text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    type="button"
                    key="submit"
                    onClick={() => props.form?.submit?.()}
                  >
                    登录账号
                  </button>,
                ];
              },
            }}
          >
            <ProForm.Group>
              <ProFormText
                width="md"
                name="userName"
                required
                label="用户名"
                placeholder="请输入用户名"
                tooltip="最长为32位"
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText.Password
                width="md"
                name="password"
                required
                label="密码"
                placeholder="请输入密码"
              />
            </ProForm.Group>
          </ProForm>
        </ProCard>
      </div>
    </div>
  );
}
