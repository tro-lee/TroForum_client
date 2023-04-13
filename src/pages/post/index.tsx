import ReplyPostButton from '@/pages/post/ReplyPostButton';
import ReplyPostBubble from '@/pages/post/ReplyPostBubble';
import TopicPostContent from '@/pages/post/TopicPostContent';
import React, {useState} from 'react';
import {history} from '@umijs/max';
import {useParams} from '@@/exports';
import '@/pages/post/indexTopicPostContent.css';
import {SystemMessage} from "@/components/SystemMessage";

export default () => {
    /*
     * 整体思路：
     * 1. 通过useParams获取当前帖子的id
     * 2. 通过useState设置主帖的id，主帖的用户名，主帖的用户id
     * 3. 通过useState设置是否更新帖子
     * 4. 通过ReplyPostButton组件设置主帖的id，主帖的用户名，主帖的用户id
     * 5. 通过ReplyPostBubble组件设置是否更新帖子
     * 6. 通过TopicPostContent组件设置帖子的id
     */
    const params = useParams();
    const [master, setMaster] = useState(params.postId);
    const [masterUserName, setMasterUserName] = useState('主帖');
    const [masterUserId, setMasterUserId] = useState(0);
    const [update, setUpdate] = useState(false);
    return (
        <div>
            <button
                type="submit"
                className="inline mb-2 text-gray-400 text-lg font-bold border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-400 hover:text-white transition-colors duration-300"
                onClick={() => history.back()}
            >
                返回
            </button>

            <div className="flex justify-between">
                <div className="w-2/5">
                    <div className="bg-gray-50 rounded-lg">
                        <ReplyPostButton
                            postId={params.postId}
                            setUpdate={setUpdate}
                            masterData={[master, masterUserId, masterUserName]}
                            setMasterData={[setMaster, setMasterUserId, setMasterUserName]}
                        />
                    </div>
                    <div className="min-h-screen">
                        <ReplyPostBubble
                            postId={params.postId}
                            update={update}
                            setUpdate={setUpdate}
                            setMasterData={[setMaster, setMasterUserId, setMasterUserName]}
                        />
                    </div>
                </div>

                <div className="w-1/2" style={{overflow: 'scroll'}} id="ScrollStyle">
                    <TopicPostContent postId={params.postId}/>
                </div>
            </div>
            <SystemMessage/>
        </div>
    );
};
