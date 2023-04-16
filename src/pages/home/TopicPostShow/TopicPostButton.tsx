import {postInsertTopicPost} from '@/service/post/post';
import {useModel} from '@@/exports';
import React from "react";
import {useState } from 'react';
import {message} from "antd";

const TopicPostButton = (props: any) => {
    const {setUpdate} = props;
    const [showModal, setShowModal] = useState(false);
    const { userId } = useModel('global');

    function handleSubmit(values: any) {
        if (!values.title || !values.content) {
            message.error('内容残缺');
            return;
        }
        postInsertTopicPost(userId, values.content, values.title, '暂无')
            .then(() => {
                setUpdate(true);
                message.success('发布成功');
                setShowModal(false);
            })
            .catch((error) => {
                console.log(error);
                message.error('发布失败');
            });
    }

    return (
        <>
            <button
                type="submit"
                className="mb-2 text-red-400 text-lg font-bold border border-red-400 rounded-md px-4 py-2 hover:bg-red-400 hover:text-white transition-colors duration-300"
                onClick={() => setShowModal(true)}
            >
                写下或讨论诗
            </button>

            <div
                className={`fixed top-1/3 left-1/2 w-1/3 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-6 rounded-md shadow-md z-20 ${
                    showModal ? 'opacity-90 visible' : 'opacity-0 invisible'
                } transition-opacity transition-visible duration-300`}
            >
                <h2 className="text-2xl font-bold mb-6">写下或讨论一首诗</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit({
                            // @ts-ignore
                            title: e.target.title.value,
                            // @ts-ignore
                            content: e.target.content.value,
                        });
                    }}
                >
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            标题
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            maxLength={12}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="content"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            内容
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            maxLength={3000}
                            rows={3}
                            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="text-gray-500 mr-4 hover:text-gray-700 transition-colors duration-300"
                            onClick={() => setShowModal(false)}
                        >
                            关闭
                        </button>
                        <button
                            type="submit"
                            className="bg-red-400 text-white font-bold rounded-md px-4 py-2 hover:bg-red-500 transition-colors duration-300"
                        >
                            发布
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default TopicPostButton;
