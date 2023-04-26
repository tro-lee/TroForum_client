import { useState } from "react";
import {InsertPoem} from "@/service/poem/poem";
import {useModel} from "@@/exports";
import {message} from "antd";

const CreatePoetryButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const {userId} = useModel("global");
    const handleCreateClick = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        InsertPoem(userId, content, title).then(() =>{
            setIsModalOpen(false);
            setTitle("");
            setContent("");
            message.success("提交成功");
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setTitle("");
        setContent("");
    };

    return (
        <div>
            <button
                type={"button"}
                onClick={handleCreateClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
                书写诗篇
            </button>
            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <form onSubmit={handleSubmit}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                                写一首新诗
                                            </h3>
                                            <div className="mt-2">
                                                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                                                    题目
                                                </label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    value={title}
                                                    onChange={(event) => setTitle(event.target.value)}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    placeholder="请输入标题"
                                                    required
                                                />
                                            </div>
                                            <div className="mt-2">
                                                <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
                                                    内容
                                                </label>
                                                <textarea
                                                    name="content"
                                                    id="content"
                                                    value={content}
                                                    onChange={(event) => setContent(event.target.value)}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    placeholder="请输入诗歌内容"
                                                    rows="5"
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        创建
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        取消
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreatePoetryButton;
