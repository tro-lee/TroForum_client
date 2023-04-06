import React, {useState} from "react";
import {message} from "antd";
import {history} from "@@/core/history";
import {updatePassword} from "@/service/account/account";

export const UpdatePassword = () => {
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleNewPasswordChange = (event: any) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: any) => {
        setConfirmPassword(event.target.value);
    };

    const handlePasswordSubmit = async () => {
        if (newPassword === '') {
            message.error('密码不能为空');
            return;
        }
        if (newPassword !== confirmPassword) {
            message.error('两次输入的密码不一致');
            return;
        }
        await updatePassword(newPassword).then(() => {
            message.success('密码修改成功');
            history.push('/login');
            setShowPasswordForm(false);
            setNewPassword('');
            setConfirmPassword('');
        });
    };
    return (
        <div>
            <div className="mb-4">
                <button
                    type={'button'}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2"
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                >
                    修改密码
                </button>
            </div>
            {
                showPasswordForm && (
                    <form onSubmit={handlePasswordSubmit} className="mb-4">
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="newPassword"
                            >
                                新密码
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="newPassword"
                                type="password"
                                placeholder="请输入新密码"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="confirmPassword"
                            >
                                确认密码
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="confirmPassword"
                                type="password"
                                placeholder="请确认密码"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                提交
                            </button>
                            <button
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={() => setShowPasswordForm(false)}
                            >
                                取消
                            </button>
                        </div>
                    </form>
                )
            }
        </div>
    )
}
