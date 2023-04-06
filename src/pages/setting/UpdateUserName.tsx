import React, {useState} from "react";
import {message} from "antd";
import {updateUserName} from "@/service/account/account";
import {useModel} from "@@/exports";

export const UpdateUserName = () => {
    const user = useModel('global');
    const [showUserNameForm, setShowUserNameForm] = useState(false);
    const [userName, setUserName] = useState('');

    const handleUserNameChange = (event: any) => {
        setUserName(event.target.value);
    };

    const handleUserNameSubmit = async () => {
        if (userName === '') {
            message.error('用户名不能为空');
            return;
        }
        await updateUserName(userName).then(() => {
            message.success('用户名修改成功');
            user.update();
            setShowUserNameForm(false);
            setUserName('');
        });
    };
    return (
        <div>
            <div className="mb-4">
                <button
                    type={'button'}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2"
                    onClick={() => setShowUserNameForm(!showUserNameForm)}
                >
                    修改用户名
                </button>
            </div>
            {showUserNameForm && (
                <form onSubmit={handleUserNameSubmit} className="mb-4">
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="username"
                        >
                            用户名
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="请输入用户名"
                            value={userName}
                            onChange={handleUserNameChange}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            提交
                        </button>
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => setShowUserNameForm(false)}
                        >
                            取消
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}
