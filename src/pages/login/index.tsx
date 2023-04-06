import React, {useEffect, useState} from 'react';
import {ProCard} from '@ant-design/pro-components';
import {postLogin} from '@/service/common/login';
import {history} from '@umijs/max';
import {Link} from '@umijs/max';
import './index.css';
import {useModel} from "@@/exports";
import Loading from "@/components/Loading";
import VerifyCode from "@/components/VerifyCode";
import {message} from "antd";

export default function Page() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const {update} = useModel('global');
    const [verify, setVerify] = useState(false);
    return (
        <div className="min-h-screen min-w-screen bg-red-300">
            <div className="flex items-center justify-center pt-20">
                <ProCard
                    style={{marginBlockStart: 75, maxWidth: 400}}
                    gutter={8}
                    title="登录"
                    direction="column"
                    hoverable
                    bordered
                    extra={<Link to="/register">跳转至注册</Link>}
                >
                    <form>
                        <div className="mb-6">
                            <div>
                                <label htmlFor="first_name" className="font">
                                    用户名
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    className="in"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                密码
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="in"
                                placeholder="•••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <VerifyCode setVerify={setVerify}/>
                        </div>
                        {loading ? <Loading/> :
                            <button
                                type="button"
                                className="subButton"
                                onClick={async () => {
                                    if (!verify) {
                                        message.error('验证码错误');
                                        return;
                                    } else {
                                        setLoading(true);
                                        await postLogin(name, password)
                                            .then(() => {
                                                update();
                                                history.push('/home');
                                            })
                                            .catch(() => setLoading(false));
                                    }
                                }}
                            >
                                登录
                            </button>
                        }
                    </form>
                </ProCard>
            </div>
        </div>
    );
}
