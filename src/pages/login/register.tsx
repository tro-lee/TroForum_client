import React from 'react';
import { ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { PostRegister } from '@/service/common/login';
import { message } from 'antd';
import { history } from '@umijs/max';
import { Link } from '@@/exports';

export default function Page() {
  return (
    <div className="min-h-screen min-w-screen bg-red-300">
      <div className="flex min-h-full items-center justify-center pt-20">
        <ProCard
          style={{ marginBlockStart: 75, maxWidth: 400 }}
          gutter={8}
          title="注册"
          direction="column"
          hoverable
          bordered
          extra={<Link to="/login">跳转至登录</Link>}
        >
          <ProForm<{
            userName: string;
            password: string;
            againPassword: string;
          }>
            onFinish={async (values) => {
              if (values.againPassword !== values.password) {
                message.error('密码不一致');
                return;
              }
              await PostRegister(values.userName, values.password);
              message.success('注册成功了~');
              history.push('/login');
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
                    注册账号
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
            <ProForm.Group>
              <ProFormText.Password
                width="md"
                name="againPassword"
                required
                label="重复密码"
                placeholder="请再次输入密码"
              />
            </ProForm.Group>
          </ProForm>
        </ProCard>
      </div>
    </div>
  );
}
