import React, {useState} from 'react';
import {ProCard} from '@ant-design/pro-components';
import {postRegister} from '@/service/common/login';
import {history} from '@umijs/max';
import {Link} from '@umijs/max';
import './index.css'
import {message} from "antd";
import {useModel} from "@@/exports";
import Loading from "@/components/Loading";
import VerifyCode from "@/components/VerifyCode";
import RecordInfo from "@/components/RecordInfo";
import zxcvbn from 'zxcvbn';
import PasswordStrengthIndicator from "@/pages/login/PasswordStrengthIndicator";


export default function Page() {

    function getPasswordStrength(password) {
        const result = zxcvbn(password);
        const score = result.score;
        if (score === 0) {
            return 1; // password is too weak
        } else if (score <= 2) {
            return 2; // password is medium strength
        } else {
            return 3; // password is strong
        }
    }

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [againPassword, setAgainPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const {update} = useModel('global');
    const [verify, setVerify] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    return (
        <div className="min-h-screen min-w-screen bg-red-300">
            <div className="flex items-center justify-center pt-20">
                <ProCard
                    style={{marginBlockStart: 75, maxWidth: 400}}
                    gutter={8}
                    title="注册"
                    direction="column"
                    hoverable
                    bordered
                    extra={<Link to="/login">跳转至登录</Link>}
                >
                    <form>
                        <div className="mb-6">
                            <div>
                                <label htmlFor="first_name" className="font">用户名</label>
                                <input type="text" id="first_name"
                                       className="in"
                                       placeholder="Name"
                                       value={name}
                                       onChange={e => setName(e.target.value)}
                                       required/>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">密码</label>
                            <input type="password" id="password"
                                   className="in"
                                   placeholder="•••••••••"
                                   value={password}
                                   onChange={e => {
                                       setPassword(e.target.value);
                                       setPasswordStrength(getPasswordStrength(e.target.value));
                                   }}
                                   required/>
                            {password && (<PasswordStrengthIndicator passwordStrength={passwordStrength}/>)}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">重复密码</label>
                            <input type="password" id="password"
                                   className="in"
                                   placeholder="•••••••••"
                                   value={againPassword}
                                   onChange={e => setAgainPassword(e.target.value)}
                                   required/>
                            <VerifyCode setVerify={setVerify}/>
                        </div>
                        {
                            loading ? <Loading/> :
                                <button type="button"
                                        className="subButton"
                                        onClick={async () => {
                                            if (!verify) {
                                                message.error("验证码错误");
                                                return;
                                            }
                                            if (againPassword !== password) {
                                                message.error("密码不一致");
                                                return;
                                            }
                                            if (passwordStrength === 1) {
                                                message.error("密码强度低")
                                                return;
                                            }
                                            setLoading(true);
                                            await postRegister(name, password)
                                                .then(() => {
                                                        update();
                                                        history.push('/login');
                                                    }
                                                ).catch(() =>
                                                    setLoading(false)
                                                );
                                        }}
                                >
                                    注册
                                </button>
                        }
                    </form>
                </ProCard>
            </div>
            <RecordInfo/>
        </div>
    );
}
