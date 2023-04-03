import React, { useState } from 'react';
import { useModel } from '@@/exports';
import { UpdatePassword, UpdateUserName } from '@/service/account/account';
import { message } from 'antd';
import { history } from '@umijs/max';
import Avatar from "@/components/Avatar";

export default function Page() {
  const user = useModel('global');
  const [showUserNameForm, setShowUserNameForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUserNameChange = (event: any) => {
    setUserName(event.target.value);
  };

  const handleNewPasswordChange = (event: any) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: any) => {
    setConfirmPassword(event.target.value);
  };

  const handleUserNameSubmit = async () => {
    if (userName === '') {
      message.error('用户名不能为空');
      return;
    }
    await UpdateUserName(userName).then(() => {
      message.success('用户名修改成功');
      user.update();
      setShowUserNameForm(false);
      setUserName('');
    });
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
    await UpdatePassword(newPassword).then(() => {
      message.success('密码修改成功');
      history.push('/login');
      setShowPasswordForm(false);
      setNewPassword('');
      setConfirmPassword('');
    });
  };

  const [avatar, setAvatar] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  const handleUpload = async () => {
    if (!avatar) {
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("avatar", avatar);

        await fetch("/api/updateAvatar", {
            method: "POST",
            body: formData,
        });

      setIsUploading(false);
    } catch (error: any) {
      setIsUploading(false);
      setUploadError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-1/2 bg-gray-200 p-4 rounded-md">
        <h1 className="text-lg font-bold mb-3 ">用户信息</h1>
        <div className="mb-4">
          <p>
            用户名: <span className="font-bold">{user.userName}</span>
          </p>
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
        <div className="mb-4">
          <button
            type={'button'}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            修改密码
          </button>
        </div>
        {showPasswordForm && (
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
        )}
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            {avatar ? (
                <img
                    src={URL.createObjectURL(avatar)}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                />
            ) : (
                <Avatar userId={user.userId}/>
            )}
          </div>

          <div className="absolute top-full left-0 w-full bg-gray-100 border border-gray-300 rounded-lg p-4 mt-2">
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4"
            />

            <button
                type="button"
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                disabled={!avatar || isUploading}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>

            {uploadError && (
                <p className="mt-4 text-red-500">{uploadError}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
